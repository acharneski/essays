# DataCalculator: Design

## A typed, relational, reactive workbook with forms and grids as views

---

## 1. What DataCalculator Is

DataCalculator is a small, embeddable runtime for **live functional relationships**.

A DataCalculator document is a graph of named values. Some values are entered by people through ordinary HTML form controls. Some are rows of typed data in sheets. The rest are derived by pure expressions, written in a JavaScript-compatible syntax with deliberately limited semantics. The runtime works out the dependencies, recomputes only what changed, and pushes results back into the page.

In one line:

> **Form + Formula = declarative micro-application.**

Stated more fully:

> **DataCalculator is a typed, relational, reactive data-and-expression model, with spreadsheets and forms as views of it.**

DataCalculator is not:

- **A better Excel clone.** The grid is one view. It is not what the model is made of.
- **A web application framework.** There is no imperative code, no event handlers, no component lifecycle.
- **A database.** It borrows typed collections, keys, and references from relational design. It stays an in-document, in-memory model.
- **A solver.** Not yet. Section 12 explains how the design keeps the door open.

A mortgage calculator can be highly interactive and still be nothing more than a deterministic function, `y = f(x)`. DataCalculator exists for that class of thing: documents that *describe a computation* rather than *program an interaction*.

---

## 2. Where It Comes From

### 2.1 HTML already solved forms

Most interactive calculators on the web are built as full applications. A React app is written to multiply three numbers, which is far too much code for the job.

HTML already provides the UI vocabulary for this:

- number, range, date, and text inputs
- radios, checkboxes, and selects
- fieldsets and labels
- `<output>` and `<progress>` elements
- built-in validation constraints such as `min`, `max`, `step`, `required`, and `pattern`

What HTML lacks is a way to say **how values derive from other values**. You cannot declare that the `<output>` named `payment` equals a formula over the inputs named `principal`, `rate`, and `term` without writing JavaScript event handlers.

DataCalculator supplies only that missing piece, the reactive glue:

    HTML controls
         ↓  values
    pure expressions
         ↓
    derived values
         ↓
    HTML outputs

### 2.2 Spreadsheets got the computation right and the addressing wrong

Spreadsheets are the most successful end-user programming environment ever made. Their core idea is sound: cells hold values or formulas, and the engine keeps a dependency graph and recalculates downstream cells in dependency order.

But a traditional spreadsheet merges six separate concerns into one surface:

1. the data model
2. the UI layout
3. the coordinate and addressing system
4. the formula language
5. the computation graph
6. persistence

The coordinate `F37` ends up carrying almost all the meaning. It doesn't say what the value is, what type it has, or why it sits next to `F36`. If you insert a row, meaning shifts. If you copy a formula, relative references rewrite themselves. If you want a schema, you write it in a header row and hope people respect it.

DataCalculator separates these concerns. It keeps what spreadsheets do well (live formulas, aggregates, cross-references, instant recalculation) and replaces coordinates with names, types, and relations.

> What if spreadsheets had been invented after HTML forms, instead of before the web?

---

## 3. Design Principles

1. **Describe computation, don't program interaction.**
   Authors state relationships. The runtime owns reactivity, ordering, validation, and rendering.

2. **Let HTML do what HTML is good at.**
   DataCalculator invents no widget language. Form controls are sources, elements are sinks, and the runtime connects them. A small, fixed view vocabulary exists for hosts that cannot accept raw HTML (§9.5). It is deliberately not a layout or widget framework. Rich grids and charts are delegated to existing libraries through thin adapters (§9.6).

3. **Expressions are pure.**
   No side effects, no mutation, no I/O, no ambient globals. The same inputs always produce the same outputs.

4. **Names, not coordinates.**
   Every value is addressed semantically: `invoice.total`, `SUM(items.total)`. A1 notation belongs to an external migration tool, never to the runtime (§7.8).

5. **Schema is first-class.**
   Columns have types, constraints, and units. Validation and dimensional checking come from the type system, not from convention.

6. **Embeddable first; iframe as last resort.**
   The runtime is a library that hosts can integrate natively. Isolation in an iframe is available when a host wants it. It is not the default architecture.

7. **Directional now, relational later.**
   Version 1 evaluates formulas in one direction, from inputs to outputs. The document model stores relationships in a form a future solver can read without a format change.

8. **The model is the truth; everything else is a view.**
   Grids, forms, cards, charts, equations, and dependency diagrams are all projections of one model.

---

## 4. Architecture Overview

DataCalculator is built in five layers:

    ┌─────────────────────────────────────────────────────────┐
    │  Hosts        plain HTML page · Markdown2 · standalone  │
    │               document · iframe (isolation mode)        │
    ├─────────────────────────────────────────────────────────┤
    │  Views        HTML bindings · grid · row form · cards · │
    │               charts · equations · dependency graph     │
    ├─────────────────────────────────────────────────────────┤
    │  Engine       dependency graph · dirty tracking ·       │
    │               topological recalculation · errors        │
    ├─────────────────────────────────────────────────────────┤
    │  Language     parser · name resolution · type checker · │
    │               pure function library                     │
    ├─────────────────────────────────────────────────────────┤
    │  Model        workbook · params · sheets · schemas ·    │
    │               rows · formulas · constraints · views     │
    └─────────────────────────────────────────────────────────┘

Dependencies point downward only. The model knows nothing about the DOM. The engine knows nothing about HTML. Views depend on the engine's public API, and hosts mount views. Because of this layering, the same workbook can drive a Markdown2 block, a bare HTML page, or a headless test harness.

---

## 5. The Workbook Data Model

### 5.1 Top-level structure

A **workbook** is the unit of authoring, storage, and embedding. It contains:

| Element        | Purpose                                                                   |
|----------------|---------------------------------------------------------------------------|
| **params**     | Named scalar values. They can be inputs (user-editable) or formulas (derived). |
| **sheets**     | Typed collections of rows, defined by a schema.                           |
| **columns**    | Fields in a sheet's schema. Each is either *stored* (data) or *computed* (formula). |
| **rows**       | Data records in a sheet. Only stored columns (and explicit overrides, §5.8) are persisted. |
| **constraints**| Boolean relations that should hold. In v1 they act as validations; later they become solver input. |
| **views**      | Presentation metadata: which grid, form, or chart shows which parts of the model. |
| **metadata**   | Title, description, units registry, locale, version.                      |

### 5.2 Params: the scalar level

Params are the simplest case. They are the named values of a plain form calculator:

    input principal: money(USD) = 300000   { min: 0 }
    input annualRate: percent   = 6.5%     { min: 0, max: 30 }
    input years: integer        = 30       { min: 1, max: 50 }

    monthlyRate = annualRate / 12
    n           = years * 12
    payment     = principal * monthlyRate / (1 - (1 + monthlyRate) ** -n)

A workbook can be made of params only. That covers the "HTML form with formulas" use case, with no sheets involved.

Because `annualRate` is a `percent`, its value is `0.065`, and `annualRate / 12` is the monthly rate. The same formula must mean the same thing when the input comes from an HTML control. §9.2 shows how that is guaranteed.

### 5.3 Sheets: typed collections

A sheet is not a grid of cells. It is a **typed collection of rows** whose shape is defined by a schema:

    sheet Products {
      key id: string
      name: string           { required }
      price: money(USD)      { min: 0 }
      cost: money(USD)       { min: 0 }

      margin    = price - cost
      marginPct = margin / price
    }

`id`, `name`, `price`, and `cost` are **stored columns**. Each row carries a value for them. `margin` and `marginPct` are **computed columns**. They are defined once, for every row, by a row-level formula. They are never stored and never typed in by hand. They cannot drift out of sync with the formula unless an author explicitly allows a visible per-row override (§5.8).

This removes the spreadsheet habit of "fill the formula down column C and hope nobody overwrites C214."

A computed column may optionally declare its result type, for documentation and as a check the type checker enforces:

    margin: money(USD) = price - cost

The annotation is never required. When present, it states intent: a reader, or an agent reviewing its own output, can see what the formula is supposed to produce. The checker then confirms that it does.

### 5.4 References between sheets

Columns can reference rows in other sheets:

    sheet Customers {
      key id: string
      name: string
      discount: percent = 0%
    }

    sheet Orders {
      key id: string
      customer: ref Customers
      date: date
      lines = OrderLines[order == this]

      subtotal = SUM(lines.total)
      discount = subtotal * customer.discount
      tax      = (subtotal - discount) * taxRate
      total    = subtotal - discount + tax
    }

    sheet OrderLines {
      order: ref Orders
      product: ref Products
      quantity: integer      { min: 1 }

      unitPrice = product.price
      total     = quantity * unitPrice
    }

    taxRate = 7.5%

Three relational patterns appear here, and they cover most of what spreadsheet users try to do with `VLOOKUP`, `SUMIF`, and cross-sheet references:

- **Forward reference (many-to-one):** `customer: ref Customers` lets `customer.discount` follow the reference.
- **Reverse relation (one-to-many):** `lines = OrderLines[order == this]` is a computed collection of the child rows that point back at this order.
- **Aggregate over a relation:** `SUM(lines.total)` rolls child values up into the parent.

The structure is close to a small relational database. The difference is that formulas are first-class reactive values instead of queries you run by hand.

A reverse relation reads like a scan of the whole child sheet for every parent row. Evaluated naively, that would be quadratic and would blow the frame budget on sheets with thousands of rows. The engine recognizes this pattern and answers it from an index instead (§8.5).

### 5.5 Keys and identity

Every sheet has a row identity:

- If a column is marked `key`, its value identifies the row and is what `ref` columns store.
- If no key is declared, the runtime assigns stable, opaque row IDs that survive sorting, filtering, and reordering.

References are stored by identity, never by position. Sorting a grid view never changes which product an order line points to.

When a referenced row is deleted, dependents do not silently lose data. By default, every formula that followed the reference evaluates to a typed `NotFound` error value, the analogue of a spreadsheet's `#REF!`. The error shows up exactly where the broken link is, and fixing the reference clears it. Cascading deletes are never the default. In a reactive calculator, a deletion that quietly removes other rows is silent data loss.

### 5.6 Ordered sheets and adjacent rows

Some spreadsheet patterns depend on row order, such as running balances and period-over-period change. A sheet can declare an ordering, which makes `prev` and `next` available:

    sheet Ledger ordered by date {
      date: date
      amount: money(USD)

      balance = (prev?.balance ?? openingBalance) + amount
    }

At the column level, `balance` depends on itself. At the cell level, each row's `balance` depends only on the row before it, so the graph stays acyclic (see §8.3). The order comes from the declared sort key, not from where rows happen to sit on screen.

A running balance has an inherent cost. Inserting or editing a row early in the order genuinely changes every later balance, so recalculation is linear in the number of rows after the edit. The engine keeps an order index so that finding `prev` and `next` is cheap. It also uses early cutoff (§8.4) to stop propagating when a change does not reach downstream values, for example when a `prev`-based formula only looks at a date. It cannot make a running sum cheaper than the sum itself, and it does not pretend to.

### 5.7 Stored values versus computed values

The persisted document contains:

- the schema, including formulas, as **source text**
- stored column values for every row
- explicit overrides on overridable computed columns, and raw text of invalid imported values (§5.8)
- input param values
- constraints and view metadata

It never persists computed values as truth. Computed results can be cached for fast first paint, but the formulas are authoritative. Opening a workbook always produces results consistent with its formulas.

### 5.8 Exceptions and draft data

Strict schemas meet messy reality in two places, and both need an honest answer rather than a workaround.

**Single-row exceptions.** Real users regularly need one row to differ from the rule: a negotiated discount on one order, or a manually agreed price on one line. Without a sanctioned mechanism, they turn the computed column into a stored column and lose the formula for every row. A computed column can therefore opt in to overrides:

    sheet Orders {
      …
      discount = subtotal * customer.discount   { overridable }
    }

An overridable column stores an optional override per row and evaluates as `override ?? formula`. Every other row still follows the formula. Views mark overridden cells visibly, show the formula value alongside, and let the override be cleared. The exception is explicit, auditable, and local.

**Draft data.** Pasted or imported data often contains `"TBD"` or `"n/a"` in a numeric column. Aborting the import loses work, and dropping the value silently loses information. Instead, an invalid entry becomes a typed `InvalidInput("TBD")` error value. The original text is preserved and the cell is flagged in views. Dependents propagate the error like any other (§7.6), and correcting the cell clears it. The column stays typed, and nobody's draft is thrown away.

---

## 6. The Type System

### 6.1 Why types matter here

In a spreadsheet, a column only *looks like* numbers until somebody types "N/A" into row 812. In DataCalculator, a column *is* numbers, and the schema says so:

    price: money(USD) { min: 0, required }

Types provide:

- **Validation at entry.** Bad input is rejected or flagged at the control, not discovered three aggregates later.
- **Correct widgets.** A `date` column gets a date picker, an `enum` gets a select, and a `boolean` gets a checkbox.
- **Formula checking.** Adding a date to a string is a static authoring error, not a runtime surprise.
- **Better agent behavior.** An agent generating or editing a workbook can see what each column means and what values are legal.

Three design choices target the most expensive class of spreadsheet bug: the one that produces a confident, well-formatted, wrong answer.

- **Dimensional analysis** (§6.3) catches incompatible unit math at authoring time.
- **Exact decimal money** (§6.2) removes floating-point drift (`0.1 + 0.2`) from financial totals.
- **Identity-based references** (§5.5) remove the classic `VLOOKUP` and sort-misalignment corruption.

None of these failures announce themselves in a spreadsheet. In DataCalculator, each one is either impossible or visible.

### 6.2 Core types

| Type                 | Notes                                                                 |
|----------------------|-----------------------------------------------------------------------|
| `number`             | IEEE-754 double. For science and engineering.                         |
| `integer`            | Whole numbers. Safe integer range, with an arbitrary-precision option. |
| `decimal(p, s)`      | Exact decimal arithmetic, represented as scaled integers. The default backing for `money`. |
| `money(CUR)`         | A decimal with a currency. Mixing currencies is a type error unless converted explicitly. |
| `percent`            | A number shown as a percentage. `7.5%` is a literal equal to `0.075`. |
| `boolean`            | `true` / `false`.                                                     |
| `string`             | Unicode text.                                                         |
| `enum(a, b, c)`      | A closed set of string values.                                        |
| `date`, `time`, `datetime`, `duration` | Calendar and clock values with explicit time-zone handling. |
| `ref Sheet`          | A reference to a row in another sheet.                                |
| `list<T>`            | An ordered collection, including filtered rows.                       |
| `record { … }`       | An anonymous structured value.                                        |

Every type can be optional (`T?`). Blank and null are explicit concepts (§7.6), not the spreadsheet mixture of empty string, zero, and nothing.

### 6.3 Units and dimensional analysis

Numeric types can carry units:

    distance: number(km)
    duration: number(hour)

    speed = distance / duration          // inferred: km/hour

The type checker tracks dimensions through arithmetic:

- `km + km` gives `km`.
- `km / hour` gives `km/hour`.
- `km + hour` is a **type error**.
- `convert(speed, m/s)` converts explicitly between compatible units.

Without unit checking, a mistake like adding meters to feet produces confident, nicely formatted, wrong output. Units make that mistake fail visibly.

Units are optional. An untyped `number` acts as dimensionless, so simple calculators stay simple.

v1 restricts dimensional analysis to linear, multiplicative units. Affine and logarithmic units, such as Celsius offsets and decibels, are deferred (§15).

---

## 7. The Expression Language

### 7.1 JavaScript-compatible, deliberately neutered

The formula language uses JavaScript syntax with heavily restricted semantics. JavaScript syntax was chosen because people and language models already know it, and syntax highlighting and editor tooling come for free. The semantics are cut down so that every expression is pure, terminating, and safe.

**Allowed:**

- number, string, boolean, `null`, percent, and unit literals
- arithmetic: `+ - * / % **`
- comparisons: `== != < <= > >=`, all strict, with no type coercion
- logic: `&& || !`, ternary `?:`, nullish `??`, optional chaining `?.`
- named references to params, columns, sheets, and related rows
- array and object literals
- calls to a whitelisted library of pure functions
- pure single-expression lambdas for collection operations, for example `x => x.price > 10`

**Forbidden:**

- assignment and mutation of any kind
- loops: `for`, `while`, `do`
- `new`, classes, `this` as JavaScript defines it (DataCalculator's `this` is a row reference, see §7.3)
- arbitrary property traversal into host objects or prototypes. `__proto__`, `prototype`, and `constructor` are rejected by the lexer and never reach the parser.
- globals: `window`, `document`, `globalThis`, `Math` (its functions are exposed as whitelisted equivalents, see §7.7)
- DOM access
- `async`, `await`, promises, timers
- I/O, network, storage
- user-defined imperative functions
- bitwise operators
- non-deterministic functions in formulas: `random()` and `now()` are provided as explicit *inputs*, not hidden effects

`==` is defined as strict equality, so the JavaScript `==`/`===` distinction disappears. `=` is never valid inside an expression, which removes a whole class of assignment-versus-comparison bugs.

### 7.2 Three levels of formula

Every formula sits at one of three levels. Each level evaluates in a different context.

**Scalar.** Defined at workbook level. One value.

    taxRate = 7.5%
    grandTotal = SUM(Orders.total)

**Row.** Defined as a computed column. Evaluated once per row, with that row's columns in scope.

    OrderLines.total = quantity * unitPrice

**Aggregate / collection.** Reduces a collection to a value, or derives one collection from another.

    Orders.subtotal  = SUM(lines.total)
    activeCustomers  = COUNT(Customers[active])
    topProducts      = TOP(Products, 5, by: marginPct)

The level is determined by *where the formula is declared*. Authors don't label it.

### 7.3 Name resolution and scope

Bare names are resolved in this order:

1. columns of the **current row** (in row formulas)
2. **params**
3. **sheet names**, which evaluate to the full collection
4. **library functions**

Two special names are available:

- `this` refers to the row the enclosing formula is evaluated for.
- `it` refers to the candidate row inside a filter predicate.

Inside a filter `Sheet[predicate]`, bare names bind to the **candidate row**, while `this` keeps its lexical meaning. So in

    lines = OrderLines[order == this]

`order` is the `OrderLines.order` column of each candidate, and `this` is the `Orders` row being computed.

Implicit scope shifting is convenient, and it is also one of the most likely sources of logic bugs, for people and for agents alike. The danger is a column name that exists on both sides. Suppose `Orders` and `OrderLines` both had a `discount` column. Then `OrderLines[discount > 0]` could plausibly mean either one, and a guess in either direction would compute something wrong without complaint.

So the rule is strict. **If a bare name inside a predicate matches a column on both the candidate row and the outer row, it is a compile error, not a warning.** The author must write `it.discount` or `this.discount`, and the formula then says what it means. Unambiguous bare names, like `order` above, keep working.

### 7.4 Collections

Sheets and relations are first-class collections. The core operations are:

| Form                          | Meaning                                         |
|-------------------------------|-------------------------------------------------|
| `Sheet`                       | all rows                                        |
| `Sheet[pred]`                 | rows where `pred` holds (the `WHERE` form)      |
| `coll.column`                 | the list of that column's values (projection)   |
| `coll.where(x => …)`          | lambda form of a filter                         |
| `coll.map(x => …)`            | pure projection to a new list                   |
| `SORT(coll, by: …)`           | ordered copy                                    |
| `UNIQUE(list)`                | distinct values                                 |
| `GROUP(coll, by: …)`          | list of `{ key, rows }` records                 |
| `FIRST(coll)`, `ONE(coll)`    | the first element; exactly one element (error if not exactly one) |
| `LOOKUP(Sheet, key)`          | a row by key (the semantic `VLOOKUP`)           |

This matches the prose forms people already use:

    SUM(items.total)
    AVG(samples.temperature)
    COUNT(Users[active])

### 7.5 Function library

The goal is functional parity with mainstream spreadsheets, with names that are familiar to spreadsheet users:

- **Math:** `abs`, `round`, `floor`, `ceil`, `sqrt`, `pow`, `exp`, `ln`, `log`, `min`, `max`, `clamp`, trigonometry
- **Aggregate / statistical:** `SUM`, `AVG`, `COUNT`, `MIN`, `MAX`, `MEDIAN`, `MODE`, `STDEV`, `VAR`, `PERCENTILE`, `CORREL`
- **Logical:** `IF`, `IFS`, `SWITCH`, `AND`, `OR`, `NOT`, `try(expr, fallback)`
- **Text:** `concat`, `upper`, `lower`, `trim`, `left`, `right`, `mid`, `len`, `replace`, `split`, `join`, `format`
- **Date / time:** `date(y, m, d)`, `year`, `month`, `day`, `weekday`, `addDays`, `addMonths`, `diff(a, b, unit)`, `eomonth`
- **Financial:** `PMT`, `PV`, `FV`, `NPV`, `IRR`, `RATE`, `NPER`
- **Lookup / array:** `LOOKUP`, `FILTER`, `SORT`, `UNIQUE`, `SEQUENCE`, `TOP`, `GROUP`, `ZIP`
- **Units:** `convert`, `unitOf`, `stripUnit`

Some functions, such as `IRR` and `RATE`, are iterative internally. That is fine because each call is self-contained and pure, and each runs under a hard iteration cap. A call that does not converge within the cap returns a typed error instead of spinning. This is a different thing from relational solving across the workbook (§12).

### 7.6 Blanks, nulls, and errors

Spreadsheets handle missing values inconsistently. DataCalculator defines them precisely:

- **Null** means "no value." It propagates through arithmetic: `null + 1` is `null`.
- **Aggregates skip nulls** by default: `SUM` ignores them and `COUNT` counts non-null values. `COUNTALL` counts rows.
- **Errors are typed values**, for example `DivideByZero`, `TypeMismatch`, `NotFound`, `InvalidInput`, `ConstraintViolation`, and `CycleDetected`. They carry a source location and propagate to dependents.
- `??` replaces null. `try(expr, fallback)` replaces any error.
- Views show errors where they occur, with a trace back to the originating node.

An error in one row never stops the rest of the workbook from computing.

### 7.7 Muscle memory: accepted aliases

JavaScript operators sit alongside spreadsheet-style function names. That pairing creates an uncanny valley for both of the populations most likely to write formulas:

- Spreadsheet users will type `^` and `<>`.
- JavaScript developers and language models will reach for `Math.round()`, `.filter()`, and a lowercase `sum()`.

Rejecting all of that would make the language feel hostile for no gain. The parser therefore accepts a small, closed set of aliases:

- **From spreadsheets:** `^` means `**`, and `<>` means `!=`. Because bitwise operators are not part of the language, `^` has no other meaning to collide with. `AND()` and `OR()` short-circuit exactly like `&&` and `||`.
- **From JavaScript:** function names are case-insensitive (`sum` is `SUM`). `Math.round`, `Math.abs`, `Math.min`, `Math.max`, and `Math.pow` resolve to the corresponding built-ins. These are recognized spellings, not access to a global `Math` object. `.filter(...)` is accepted as `.where(...)`.

The formatter rewrites every alias to one canonical spelling. Authors can type what their fingers know, while stored source stays uniform and diffs stay clean. The alias set is closed and documented. It is not a general compatibility layer.

### 7.8 Migrating from A1 spreadsheets

Most of the world's tabular logic lives in spreadsheets, and the schema-first model is a real learning curve. A good path from an existing workbook is therefore critical to adoption, not a nice-to-have.

It is also where the engineering risk concentrates. Deterministically decompiling real-world spreadsheets is a research project in disguise. Merged cells, ragged headers, horizontal financial time series, and one-off formulas break regular patterns constantly. A runtime that kept untranslatable parts in "A1 compatibility mode" would end up hosting workbooks that are 60% relational and 40% coordinates. That hybrid is worse to maintain than either pure form.

So A1 support lives **outside the runtime**. The engine has no compatibility mode and never evaluates a coordinate reference. Migration is the job of an external, LLM-assisted conversion tool and playground. The tool:

- infers schemas from header rows and column contents
- rewrites regular patterns into names; for example, `=B2*C2` filled down column D becomes `total = quantity * unitPrice`
- recognizes structures such as horizontal time series and proposes a relational shape for them
- coerces messy cells into typed `InvalidInput` values (§5.8) rather than discarding them
- reports anything it cannot translate for human review *before* conversion, instead of leaving it behind as A1

Its output is ordinary DataCalculator source that must pass the type checker like any other workbook. Editors can route formulas pasted from Excel or Google Sheets through the same translator.

Native authoring always uses names. Agents in particular should generate names, never coordinates.

---

## 8. The Evaluation Engine

### 8.1 Pipeline

    source text
      → parse            (AST per formula)
      → resolve          (bind names to params, columns, sheets, functions)
      → type-check       (types, units, nullability)
      → compile          (flat instruction arrays, see §8.7)
      → build graph      (dependency edges, relation indexes)
      → evaluate         (topological order, incremental)
      → publish          (notify views of changed nodes, batched)

Parse, resolve, and type-check errors are **authoring errors**. They are reported with precise locations and never reach evaluation. Evaluation errors are **values** (§7.6).

### 8.2 The dependency graph

The engine keeps the graph at two granularities:

- **Schema level.** Nodes are params and columns. An edge `A → B` means B's formula reads A. This level is used for static analysis, cycle detection, documentation, and the Mermaid dependency diagram.
- **Instance level.** Nodes are individual param values and individual row-column cells. This level is used for incremental recalculation.

Instance-level edges come from the schema edges plus the actual relations. For example, `OrderLines[17].total` feeds `Orders["A-1001"].subtotal` only because row 17 references order A-1001. When a reference changes, the instance edges change with it.

### 8.3 Cycles

Cycles are **authoring errors**, and that is one of the design's useful properties. The engine reports the full cycle path:

    Cycle: tax → total → discount → tax

There are two carefully bounded exceptions, both self-references that are cycles at schema level but need not be cycles at instance level.

- **`prev` in an ordered sheet.** Each row depends only on the row before it in a declared order, so the instance graph is acyclic by construction. The engine checks for this case statically and accepts it.
- **A self-reference through a `ref` to the same sheet**, as in hierarchies:

      sheet Employees {
        key id: string
        manager: ref Employees?
        depth = (manager?.depth ?? -1) + 1
      }

  Here acyclicity depends on the data, not the schema. If the data forms a loop (A manages B, B manages A), the engine detects it at instance level, both when building the graph and whenever a reference changes. The affected cells evaluate to `CycleDetected` error values carrying the loop's path, and the rest of the workbook keeps computing.

Any other self-reference is rejected at authoring time.

### 8.4 Incremental recalculation

When a source changes (an input edited, a row added or removed, a stored value changed, a reference changed):

1. mark the changed node dirty
2. propagate the dirty flag to all downstream nodes
3. evaluate dirty nodes in topological order
4. if a node's new value equals its old value, stop propagating along that branch (early cutoff)
5. publish the set of nodes whose values actually changed

Changes are **batched**. All writes caused by one host event, such as a paste of fifty rows or a slider drag frame, are coalesced into a single recalculation, and subscribers receive one change notification listing every changed node. Batching keeps views efficient today. It also means the notification contract already behaves as if evaluation were asynchronous, so moving the engine into a Web Worker later (§8.8) does not break v1 view bindings.

Aggregates are recomputed as whole nodes in v1. Later optimizations can maintain them incrementally: add or subtract deltas for `SUM` and `COUNT`, and use order-statistic structures for `MEDIAN` and `PERCENTILE`. These optimizations don't change semantics.

### 8.5 Relation indexes

A filter like `OrderLines[order == this]`, evaluated by scanning, costs O(M) per parent row, or O(N × M) for the whole sheet. That is enough to blow the frame budget at a few thousand rows.

When building the schema graph, the engine detects equality predicates on `ref` and `key` columns and maintains an incremental hash index for each one, of the form `Map<RowId, Set<RowId>>` from target row to referring rows. Reverse relations and `LOOKUP` then become constant-time lookups per row. The index is updated on row insertion, deletion, and reference change, and it is also the source of the instance-level edges in §8.2.

Predicates that cannot be indexed still work by scanning. That is fine for small collections. On large sheets, the engine reports a performance diagnostic that names the formula.

### 8.6 Determinism

For any given workbook state, evaluation is fully deterministic:

- no hidden clocks or random sources (`now` and `random` are explicit inputs)
- decimal arithmetic for money, so no float drift in currency totals
- a defined iteration order for every collection operation
- resource limits measured in evaluation steps, not wall-clock time (§8.7)
- locale affects formatting only, never computation

So workbooks can be tested, diffed, cached, and reproduced exactly.

### 8.7 Execution model

Validated ASTs are compiled into flat instruction arrays and run by a small interpreter. This avoids walking the tree on every keystroke, and it makes resource limits precise:

- **Gas metering.** Each instruction costs a deterministic number of steps, and each evaluation has a step budget. Because the budget is counted rather than timed, a workbook that exceeds it does so at the same point on every machine. That preserves determinism while still protecting the host.
- **Allocation-light numerics.** `decimal(p, s)` and `money` are represented as scaled integers (safe integers where they fit, `BigInt` otherwise) rather than wrapper objects, which avoids garbage-collection churn during large recalculations.
- **Hard caps.** Iterative functions such as `IRR` and `RATE` have iteration caps. `**` has bit-length limits on its results, and `SEQUENCE()` and other collection constructors have size limits.

Compiled instructions are an internal cache derived from source text. They are never persisted (§11.1).

### 8.8 Performance targets

v1 targets workbooks with thousands of rows across a handful of sheets, recalculating in well under a frame for typical edits. Relation indexes (§8.5) and compiled evaluation (§8.7) are what make that target realistic. The engine runs on the main thread by default. Large workbooks can move evaluation into a Web Worker. Because formulas are pure and serializable and notifications are already batched, this needs no change to the language or the view contract.

---

## 9. Views

### 9.1 The model is not the grid

Each part of the model can be shown many ways:

- **parameter panel / form:** HTML controls bound to params
- **grid:** the familiar spreadsheet table for a sheet, with stored columns editable and computed columns read-only (unless overridable, §5.8)
- **row form:** one row of a sheet as a form, for detail editing
- **cards:** each row rendered through a template
- **filtered table:** a grid over a collection expression instead of a whole sheet
- **chart:** a series derived from collection expressions
- **dashboard:** a layout combining several of the above
- **equations:** formulas typeset as mathematics
- **dependency graph:** the schema-level graph as a diagram

All views read from the same model and update from the same engine notifications.

### 9.2 Binding to plain HTML

The simplest case is a plain HTML form with a formula block. Named controls are sources and `<output>` elements are sinks:

    <form data-calc="mortgage">
      <label>Principal
        <input type="number" name="principal" value="300000" min="0"
               data-type="money(USD)">
      </label>
      <label>Annual rate (%)
        <input type="range" name="annualRate" value="6.5" min="0" max="15" step="0.125"
               data-type="percent">
        <output name="annualRate" data-format="percent"></output>
      </label>
      <label>Years
        <select name="years">
          <option>15</option><option selected>30</option>
        </select>
      </label>

      <p>Monthly payment:
        <output name="payment" data-format="currency"></output>
      </p>
    </form>

    <script type="text/x-datacalc" for="mortgage">
      monthlyRate = annualRate / 12
      n           = years * 12
      payment     = principal * monthlyRate / (1 - (1 + monthlyRate) ** -n)
    </script>

These formulas are identical to the text-syntax version in §5.2, and that is deliberate. A slider labeled "6.5" naturally holds the number `6.5`. Inferred as a plain `number`, it would force HTML authors to write `annualRate / 100 / 12` while schema authors write `annualRate / 12`. Moving a workbook between the two surfaces would then silently produce answers off by a factor of 100. `data-type="percent"` tells the runtime that the control's value is a percentage, so `"6.5"` is read as `0.065`. The formulas, and anything an agent generates for one surface, carry over to the other unchanged.

Binding rules:

- Every named control inside a `data-calc` container becomes an **input param**. Its type is inferred from the control: `type="number"` maps to `number`, `type="date"` to `date`, a checkbox to `boolean`, and a select to an `enum` of its options.
- `data-type` and `data-unit` override the inference. For example, `data-type="percent"` scales the displayed value into a fraction, and `data-unit="km"` attaches a unit. An explicit schema overrides both.
- HTML validation attributes (`min`, `max`, `step`, `required`, `pattern`) become schema constraints, interpreted in the control's display scale.
- `<output name="x">` and any element with `data-bind="x"` show the value of `x` as text content, formatted according to `data-format` or the type's default format.
- Attribute binding is limited to a strict whitelist: `value`, `min`, `max`, `disabled`, `readonly`, `aria-*`, and `data-*`. Model values are never bound to `href`, `src`, `style`, or any `on*` handler.
- For very small cases, `data-formula` can sit directly on an output element: `<output data-formula="a * b">`.
- The `text/x-datacalc` script block is **data, not code**. The browser never runs it. The runtime parses it as formulas.

This is the whole authoring model for most calculators: HTML for the UI and formulas for the logic, with nothing else required.

### 9.3 Binding sheets to grids and templates

    <table data-calc-sheet="OrderLines"
           data-columns="product.name, quantity, unitPrice, total"
           data-editable="product, quantity">
    </table>

    <template data-calc-each="Products[marginPct > 0.4]">
      <article class="card">
        <h3 data-bind="name"></h3>
        <p>Margin: <span data-bind="marginPct" data-format="percent"></span></p>
      </article>
    </template>

Grid views support adding, removing, and editing rows according to the schema. They also support sorting and filtering as **view state**, which never changes the model. Editors for `ref` columns are pickers over the target sheet.

### 9.4 Formatting

Formatting belongs to views and never affects values:

- type defaults: money shows its currency, percent shows `%`, dates follow the locale
- `data-format` patterns such as `currency`, `percent`, `0.00`, `#,##0`, `yyyy-MM-dd`
- unit display such as `12.4 km/h`, with optional display-unit conversion

### 9.5 The fixed view vocabulary

Some hosts cannot or should not accept raw HTML. Examples are a Markdown2 fenced block, a chat UI rendering a workbook an AI wrote, and a CMS displaying untrusted content. For these hosts the workbook source itself can declare views:

    view form(principal, annualRate, years) -> payment
    view table(OrderLines: product.name, quantity, total)
    view value(grandTotal)

The vocabulary is small and fixed: `form`, `table`, and `value`. The host renders each from the parsed AST using its own trusted templates. There are two strong reasons for this. A view declaration is a fraction of the tokens of equivalent HTML, which matters to agents. And because no author-supplied markup ever reaches the DOM, there is no template-injection or XSS surface in untrusted documents.

The vocabulary is deliberately not a layout language. Pressure to grow it into dashboards, chart grammars, and grid configuration pulls directly against Principle 2. It would trap the project into building and maintaining a widget framework that competes with mature libraries. The line is firm: declarative views cover the default presentation of fenced and untrusted content, and anything custom is HTML.

### 9.6 Adapters, not widgets

Custom layouts stay in standard HTML: `<form>`, `<template>`, ordinary elements, and the bindings above. For rich grids and charts, DataCalculator provides thin adapter hooks rather than its own implementations. An adapter subscribes to engine notifications, reads collections through the public API, and writes edits back with `wb.set`. That lets hosts use established table and chart libraries while the engine remains the single source of truth. The built-in editable grid of §9.3 covers the common case; it is not meant to replace those libraries.

---

## 10. Embedding

### 10.1 Library first

Embeddability is the core architectural requirement. DataCalculator ships as a self-contained JavaScript library with a small surface:

    const wb = DataCalc.load(source)        // parse + type-check
    wb.diagnostics                          // authoring errors (structured)
    wb.get("payment")                       // read any node
    wb.set("principal", 250000)             // write an input
    wb.on("change", nodes => { … })         // subscribe (batched)
    wb.inspect()                            // model, graph, and values as JSON
    DataCalc.mount(wb, element)             // bind to DOM views

The engine runs headless without a DOM, which makes it usable in tests, on servers, and for agent tooling. Diagnostics are structured JSON with locations, expected and actual types, and "did you mean" suggestions. They are designed to be consumed by tool-calling agents as readily as by people. A browser development overlay can show intermediate formula values on hover.

### 10.2 Deployment modes

The same engine supports several modes:

1. **Embedded directly in a host document.** Markdown2 renders a DataCalculator block natively, the same way it handles Mermaid or X3D blocks.
2. **Embedded in an ordinary HTML page.** Add a script tag and `data-calc` attributes (§9.2).
3. **A standalone document.** A single self-contained workbook file containing schema, data, views, and runtime.
4. **An iframe.** Used only when a host specifically wants isolation, such as untrusted content or style containment. The iframe is the escape hatch, not the architecture.

### 10.3 Markdown2 integration

In Markdown2, a workbook is a fenced block:

    ```datacalc
    input principal: money(USD) = 300000
    input annualRate: percent   = 6.5%
    input years: integer        = 30

    monthlyRate = annualRate / 12
    payment     = PMT(monthlyRate, years * 12, -principal)

    view form(principal, annualRate, years) -> payment
    ```

Views in fenced blocks use the fixed vocabulary of §9.5. When a block declares no view, the host generates a default form from the inputs and outputs. Blocks can be named and referenced elsewhere in the document, so prose can include live values: "Your payment is {{mortgage.payment}}."

This places DataCalculator alongside the other declarative formats a host like Markdown2 already supports:

- MathJax describes math
- Mermaid describes relationships
- WaveDrom describes temporal state
- X3D describes space
- GeoJSON describes geography
- **DataCalculator describes live functional relationships**

### 10.4 Security model

Formulas cannot do anything harmful, so a workbook from an untrusted source is safe to evaluate without an iframe. That claim rests on several layers:

- **No route to the host.** The formula language has no access to globals, the DOM, or I/O (§7.1). `__proto__`, `prototype`, and `constructor` are rejected at the lexer level.
- **No prototype surface.** Internal records and rows are null-prototype objects or `Map`s, so even an engine bug cannot walk into inherited properties.
- **No dynamic code.** Formulas are compiled into the engine's own instruction format and interpreted (§8.7), never run through `eval` or `Function`.
- **Bounded resources.** Gas metering, maximum collection sizes, maximum lambda nesting depth, iteration caps, and bit-length limits mean a hostile workbook cannot freeze the host.
- **Safe DOM writes.** Views write model values only as text content or through the attribute whitelist of §9.2, never through `innerHTML`. Views from the fixed vocabulary are rendered from the AST with host templates (§9.5).
- **Safe projections.** Identifiers and strings are escaped when the model is projected into other formats, such as Mermaid diagrams, MathJax equations, or CSV exports (§13), so names cannot inject syntax into those renderers.

---

## 11. Serialization

### 11.1 Two equivalent forms

- **Text syntax**, as used throughout this document. It is meant for people and agents, diffs cleanly, and fits inside Markdown.
- **Canonical JSON**, a structured equivalent meant for tooling, storage, and interchange.

The two forms round-trip losslessly. Formulas are stored as source text in both, in canonical spelling (§7.7), never as compiled instructions or evaluation order.

### 11.2 Canonical JSON sketch

    {
      "datacalc": "1.0",
      "params": {
        "taxRate": { "formula": "7.5%" }
      },
      "sheets": {
        "OrderLines": {
          "columns": {
            "order":     { "type": "ref Orders" },
            "product":   { "type": "ref Products" },
            "quantity":  { "type": "integer", "min": 1 },
            "unitPrice": { "formula": "product.price" },
            "total":     { "formula": "quantity * unitPrice" }
          },
          "rows": [
            { "order": "A-1001", "product": "P-7", "quantity": 3 }
          ]
        }
      },
      "constraints": [],
      "views": []
    }

### 11.3 External data

A sheet's rows can be inline, as shown above, or bound to an external source such as a CSV file, a JSON array, or the output of the spreadsheet migration tool (§7.8). External data is loaded through the host at load time and handed to the engine as plain rows. Values that do not fit their column's type arrive as `InvalidInput` (§5.8). Formulas never fetch anything.

---

## 12. Solving: Out of Scope, Not Precluded

### 12.1 Calculation is directed; solving is relational

Version 1 is strictly directional:

    inputs → formulas → outputs

This is a dependency graph, which makes incremental recalculation straightforward and cycles meaningful as errors.

Many useful questions run the other way, though:

- "What principal gives me a $2,000 payment?"
- "What price maximizes profit, given the demand curve?"
- "Find the staffing levels that satisfy every constraint at minimum cost."

None of these are formulas. They are **relations** that a solver has to satisfy.

### 12.2 Keeping the door open

The document model therefore separates node kinds from day one, even though v1 only evaluates some of them:

    // formula: directed, evaluated by v1
    payment = PMT(monthlyRate, n, -principal)

    // constraint: in v1, checked as a validation
    constraint revenue >= 1_000_000
    constraint Staff[role == "nurse"].count >= 4

    // variable: in v1, treated as an ordinary input
    variable price in [10, 100]

    // goal: in v1, stored but ignored
    goal minimize(totalCost)

In v1:

- **Formulas** are evaluated.
- **Constraints** are evaluated as boolean checks. Violations appear as diagnostics on the relevant nodes.
- **Variables** behave like inputs that carry bounds.
- **Goals** are parsed, type-checked, stored, and preserved, and they don't affect evaluation.

The engine emits an explicit diagnostic for `variable` and `goal` declarations, noting that v1 does not solve them, so nobody mistakes a preserved goal for an achieved one.

### 12.3 What this makes possible later

Because formulas are stored as named expressions (equations) rather than as an evaluation schedule, a later solver can read parts of the workbook as:

- **root finding / goal seek:** vary one variable until a target holds
- **bidirectional editing:** edit `payment` and have `principal` update, by inverting the relation
- **simultaneous equations:** sets of mutually dependent relations
- **optimization:** linear, integer, or nonlinear, subject to constraints
- **constraint satisfaction:** discrete assignment problems
- **symbolic manipulation:** rearranging formulas algebraically

The only rule v1 must obey is to **never encode "formulas are always acyclic" into the storage format**. Acyclicity is a property v1's evaluator requires, not a property the document must have. A future file containing a cycle of constraints is a valid document that v1 simply can't fully solve, and it should say so clearly instead of rejecting the file.

---

## 13. The Workbook as a Semantic Object

The model is explicit: named values, typed columns, formulas as expressions, and dependencies as a graph. So a workbook can be **projected into representations** that already exist elsewhere:

    Workbook model
     ├─ table views         (grid per sheet)
     ├─ HTML forms          (params and row editors)
     ├─ MathJax equations   (formulas typeset as math)
     ├─ charts              (Google Charts / Plotly series from collections)
     ├─ Mermaid diagram     (schema-level dependency graph)
     ├─ WaveDrom trace      (recalculation order after a change)
     └─ Markdown2 document  (generated documentation of the model)

For example, the mortgage workbook can render its own documentation: the inputs with units and ranges, the formulas typeset as equations, a dependency diagram, and a live form. All of it comes from the same source, and none of it can go stale. Every projection escapes names and strings for its target format (§10.4).

At this point the workbook stops being a "spreadsheet file" and becomes a **computational object**. A host like Markdown2 is one of several environments that can present it.

### 13.1 Agents

AI-assisted authoring may be the format's highest-leverage use, and the design suits it for three reasons.

- **Semantic over spatial.** Language models are poor at reasoning about 2D grid coordinates like `F37`. For a simple calculator they tend to produce a bloated, fragile React app. A named, relational, declarative model matches how they already represent the problem. A 200-line application becomes a ten-line block whose every line means something.
- **Zero-trust execution.** The language is pure, terminating, and never `eval`ed (§10.4). Hosts such as chat interfaces, Markdown renderers, and content systems can therefore mount an AI-generated interactive micro-app directly in the page, without an iframe sandbox. The fixed view vocabulary (§9.5) closes the remaining markup-injection surface.
- **The compiler as a reward signal.** The headless engine gives an agent near-instant static verification of types, units, scope, and cycles through structured `wb.diagnostics`, before anything is shown to a user. An agent can generate, check, and repair in a loop. Optional result-type annotations (§5.3) let it state its intent and have that intent checked.

Requests in prose map directly onto model edits. "Make the assumptions adjustable" no longer means "write a React app." It means "turn these constants into named inputs and connect the equations."

---

## 14. Scope

### 14.1 Version 1

- Workbook model: params, sheets, stored and computed columns, optional result-type annotations, keys, refs, reverse relations, ordered sheets with `prev`/`next`, overridable computed columns
- Type system: core types, nullability, money as scaled-integer decimals, percent, and linear units with dimensional checking
- Expression language: the JavaScript-compatible pure subset, the three formula levels, collections, the core function library, the closed alias set, mandatory disambiguation of colliding names in predicates
- Engine: two-level dependency graph, cycle detection with paths (static, plus instance-level detection of data loops), relation indexes, compiled evaluation with gas metering, incremental recalculation with early cutoff, batched notifications, typed error values
- Views: HTML form binding with `data-type`/`data-unit`, `<output>` and `data-bind` sinks with the attribute whitelist, the fixed `form`/`table`/`value` vocabulary, editable grids, row forms, templates, adapter hooks
- Constraints evaluated as validations; variables and goals parsed, preserved, and flagged as unsolved
- Serialization: text syntax and canonical JSON, round-tripping
- Hosts: plain HTML, Markdown2 fenced blocks, standalone document, optional iframe
- Import: CSV, with invalid values preserved as `InvalidInput`
- Companion tooling, outside the runtime: the LLM-assisted spreadsheet migration tool (§7.8)

### 14.2 Later

- Solving: goal seek, bidirectional editing, optimization, constraint satisfaction
- Incremental aggregate maintenance and worker-based evaluation for large workbooks
- Charts and dashboard views, through adapters rather than built-in widgets
- Matrix and pivot views, essential for horizontal financial time-series models
- Affine and logarithmic units (temperature offsets, decibels)
- Generated documentation and diagram projections (§13)
- Collaborative editing: the model's stored values are a natural fit for CRDTs
- Versioned schema migration for long-lived workbooks

### 14.3 Never

- Arbitrary JavaScript in formulas
- Side effects, I/O, or network access from the formula language
- Coordinates as the native addressing model, or A1 references inside the runtime
- A general-purpose layout or widget language

---

## 15. Open Questions and Proposed Resolutions

An independent review of this design from six perspectives (technical architecture, UX and authoring, spreadsheet migration, security, business adoption, and AI authoring) found the reactive relational model sound. Agreement was high, about 0.91 on a 0–1 scale against a 0.70 threshold. The tensions it surfaced were almost entirely about v1 scope and boundary ergonomics, not about fundamentals. Several of the questions below now have proposed answers as a result.

1. **Formula syntax for definitions.** *Resolved.* Definitions keep the statement form, `total = quantity * unitPrice`. `=` already never appears inside expressions (§7.1), so a separate `:=` adds ceremony without removing a real ambiguity. Optional result-type annotations (`margin: money(USD) = price - cost`, §5.3) give documentation and verification value without making the syntax heavier.

2. **Lambda reach and named helpers.** Single-expression lambdas are pure and terminating over finite collections. Named helpers would stop people copying a complex formula across sheets, for example `fn bmi(w, h) = w / h ** 2`. The cost is type-checker complexity: inferring polymorphic types over dimensional units and row records is a substantial piece of compiler work. That argues for deferring helpers to v2. *Proposed resolution:* allow non-recursive scalar helpers in v1 only if their parameter and return types are explicitly annotated, which avoids type inference over units entirely. The fallback is to treat them as hygienically expanded macros over the AST. Recursion stays forbidden either way.

3. **Reference integrity.** *Resolved default.* Deleting a referenced row makes dependents evaluate to a typed `NotFound` error (§5.5). Deletes never cascade silently. Whether individual `ref` columns may opt in to `restrict` (block the deletion) or `nullify` remains open. Cascade is excluded.

4. **Currency conversion.** *Resolved.* Exchange rates are external, time-varying data and stay out of the core language. They are modeled as an ordinary sheet supplied by the host and used through standard relational lookups, so conversion is just another formula over a `Rates` sheet.

5. **Units registry.** Should there be a fixed built-in set plus user-defined units? v1 restricts itself to linear multiplicative units. How to handle affine and logarithmic units, such as temperature offsets and decibels, is still open.

6. **View language.** *Direction set.* A minimal, fixed declarative vocabulary (`form`, `table`, `value`) for fenced blocks and untrusted or AI-generated content (§9.5). Custom layouts stay in standard HTML, and adapter hooks connect third-party grids and charts (§9.6). The vocabulary should resist growing into a widget framework.

7. **Naming.** *Direction agreed; name open.* "DataCalculator" describes the purpose but sounds like a legacy enterprise utility, and it suggests a spreadsheet clone rather than a model with views. The review agreed on a web-native name that fits the Markdown and web ecosystem. Candidates include *Sheetless*, *CalcML*, *Formulas*, and *LiveModel*. This document keeps the working name until the choice is made.

---

## 16. Summary

DataCalculator starts from a modest observation: HTML forms already provide the UI, and what's missing is a pure, safe way to say how values relate. Following that idea through leads to a different kind of tool:

- **Values have names, not coordinates.**
- **Sheets are typed collections, not grids.**
- **Formulas are pure expressions at three levels: scalar, row, and aggregate.**
- **Relations between sheets replace lookup hacks, and indexes keep them fast.**
- **Types, units, and exact money catch mistakes before they produce convincing wrong answers.**
- **Exceptions and messy data are explicit, typed, and visible, not silent.**
- **A dependency graph gives instant, incremental, deterministic recalculation.**
- **Forms, grids, cards, charts, equations, and diagrams are all views of one model.**
- **It is a library that hosts embed natively, with the iframe as a fallback.**
- **Calculation runs in one direction today, and the model is ready for relational solving later.**

The result has spreadsheet ergonomics without the spreadsheet's flaws: a typed, relational, reactive workbook that can be embedded anywhere a document can go, and that people and agents alike can write safely.