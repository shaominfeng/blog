---
title: "Understanding AI Systems Through a Restaurant"
subtitle: "The model is the head chef, the inference layer is the head waiter"
description: "A four-layer breakdown of an AI system using an “intelligent restaurant”: the customer, the service team, the kitchen, and the tool layer. And why the inference layer is where the real difference lives."
part: "primer"
order: 1
readingTime: 24
date: "2026-01-29"
tags: []
cover: "/images/restaurant-architecture.webp"
---

> One everyday scene to explain how an AI system actually works, the whole path from ordering to serving.

---

## The full architecture of the restaurant

### The overall diagram (the picture)

![Restaurant architecture of an AI system](/blog/images/restaurant-architecture.webp)

*Figure: the four-layer restaurant architecture of an AI system — the full path from a customer ordering to the kitchen serving (blackboard sketch style)*

**The four layers**:

**Layer 1 - Customer layer (blue)**:
- The customer states a need: “I want a Sichuan banquet, 8 people”
- In 2022 that took a detailed description → in 2026 it takes one sentence of goal

**Layer 2 - Front-of-house team / inference layer (gold), the most important one**:
- **Agent head waiter** (center): plans the menu, coordinates the kitchen, optimizes cost
- **Assistant system** (left): keeps the history, passes the request along
- **API Gateway** (right): reception, billing
- This is **where the difference lives**: same head chef, different service team, different experience

**Layer 3 - Kitchen / model layer (red)**:
- **Head chef (the AI model)**: GPT-4, Claude Opus, DeepSeek-R1
- **Memory over time**: 4K → 100K → 1M (context window)
- **Stove (GPU)**: burner output sets the speed
- **Resource monitoring**: thermometer (compute), clock (time)

**Layer 4 - Tools and resources (green)**:
- **Skills as cookbooks** (left): *The Complete Sichuan Cookbook*, *French Pastry* = knowledge, method
- **MCP as procurement** (center): markets, suppliers = getting resources from outside
- **Function Calling** (right): knife, pot, spatula = the basic tools

**How information flows** (arrow direction):
```
customer orders → service team understands and plans → kitchen cooks → tools and resources are called
```

---

### The flow diagram (technical view)

---

## Each role in detail

### 1. The customer (the user)

**Role**: states what they want to eat
**Evolution**: from “cooking expert” to “just say the goal”

```
2022: you had to be a cooking expert
"Cut the chicken into 1cm cubes, marinate 15 minutes, add light soy sauce and cooking wine..."

2026: you just state the goal
"A table of Sichuan dishes for 8, budget 2000"
```

### 2. The front-of-house team (inference layer), the most important part

**Core members**:
- **Head waiter (the Agent core)**: planning, decisions, coordination
- **Waiter (assistant system)**: keeps the history, passes the request along
- **Front desk (API Gateway)**: reception, billing

**What the head waiter is actually responsible for**:
```
Understand the request:
"A Sichuan banquet, 8 people, budget 2000, someone doesn't eat spicy"
↓ parsed into
- Cuisine: Sichuan
- Headcount: 8
- Budget: ¥2000 (about ¥250 per person)
- Constraint: at least 1-2 non-spicy dishes

Plan the menu:
Consult The Complete Sichuan Cookbook (Skills)
→ Design: 3 cold dishes, 6 hot dishes, 1 soup, 2 staples

Coordinate resources:
- Check inventory (what ingredients are on hand)
- Procurement list (what to buy through MCP)
- Assign stoves (which GPU does what)

Optimize the sequence:
- Cold dishes made ahead
- Hot dishes: control the pace of serving
- Soup: slow simmer, serve last

Control cost:
- Prep the common ingredients in advance (Prompt Caching)
- Clear the empty plates (Auto-Compact)
- Give the head chef only the cookbook he needs (Skills load on demand)
```

**Why is the inference layer the most important?**
```
Most people think: AI = the head chef (the model)
What it actually is: an AI system = head chef + service team

Same head chef (same model), different service team (inference layer):
- Bad service team: the customer can't explain, the kitchen cooks the wrong dish, cost is high
- Good service team: understands fast, optimizes the sequence, keeps cost under control

That's why:
Claude Code (Anthropic's service team) > ChatGPT (OpenAI's service team)
even when the head chef (the model) is in the same class
```

### 3. The kitchen (model layer)

**Head chef (the AI model)**:
- **Brain / skill** = model parameters (GPT-4, Claude Opus, DeepSeek-R1)
- **Memory** = context window
  - Novice (4K): remembers 4 dishes
  - Chef (100K): remembers 100 dishes
  - Master chef (1M): remembers every detail of 1000 dishes

**Stove (GPU)**:
- Burner output = compute (H100 vs A100 vs consumer cards)
- Number of stoves = GPU cluster size
- More heat, faster serving

**Electricity (compute resources)**:
- Fuel supply = electricity cost
- Determines how many stoves you can light
- Cloud restaurant (unlimited power) vs home kitchen (limited power)

**Pantry (storage)**:
- Holds ingredients and par-cooked components
- Maps to the model's intermediate results

### 4. Tools and resources

#### Skills (the cookbook shelf)

**Definition**: cooking knowledge, method, best practice

**What is on the shelf**:
```
The Complete Sichuan Cookbook:
- Standard method for kung pao chicken
- Heat control technique
- Knife-work requirements
- Plating style

French Pastry:
- Macaron temperature curve (150°C for 15 minutes)
- Soufflé whipping technique (to soft peaks)
- Caramel fundamentals

The Essence of Cantonese Cooking:
- Soup timetable (slow-simmered broth, 3 hours)
- Steaming technique (8 minutes once the water boils)

The Cooking Compendium:
- Knife-work encyclopedia
- Heat control
- Flavor balance
```

**What it gives you**:
- ✓ Knowledge, method, a standard process
- ✓ Consistent quality
- ✓ Reusable (every kung pao chicken follows the same recipe)
- ✓ Token-efficient (only the cookbook that is needed)

#### MCP (the procurement system)

**Definition**: the channels for getting resources from outside

**The channels**:
```
Market stall interface:
- Fresh vegetables (local filesystem)
- Seasonal fruit (live data)

Seafood supplier:
- Deep-sea fish (database query)
- Lobster and king crab (API call)

Spice warehouse:
- Assorted spices (tool integration)
- Sauces (third-party service)

Supermarket API:
- Everyday ingredients (common data source)

Imported food merchant:
- Rare ingredients (specialized API)
```

**What it gives you**:
- ✓ A connection to the outside world (data, services, tools)
- ✓ Live access (dynamic data)
- The cost: heavy token use (every supplier's catalog has to be handed to the chef)
- The cost: security risk (an untrusted supplier can be a problem)

#### Function Calling (the basic tools)

**Definition**: the most basic ability to call a tool

**The tool list**:
- Knife (cut)
- Pot (boil)
- Spatula (stir-fry)
- Ladle (serve)

**The analogy**:
- The tools every chef must own
- Without a cookbook you can still “wing it”
- But the result is inconsistent and quality is hard to guarantee

---

## How ordering evolved

### 2022: you had to be a cooking expert (prompt engineering begins)

**The scene**:
```
Customer (needs a very detailed description):
"I want kung pao chicken.
Cut the chicken into 1cm cubes, marinate 15 minutes in light soy sauce, cooking wine and starch.
Deep-fry the peanuts until golden.
Use facing-heaven chilies, cut into 2cm segments, deseeded.
Mince the scallion, ginger and garlic; keep the white and green parts separate.
Sweet-sour ratio 1:2, add soy sauce, cooking wine and starch to make the sauce.
Heat the wok, add oil, blast the Sichuan peppercorns over high heat 30 seconds, then remove.
Add the chicken, stir-fry over medium heat 2 minutes until it changes color.
Add the dried chilies, scallion, ginger and garlic, fry 1 minute until fragrant.
Add the cucumber and peanuts, toss 1 minute.
Finally pour in the sauce, toss fast 10 seconds, and plate."

Chef: follows the description exactly (one wrong step and it fails)

Result:
✓ If the description is accurate, you get a good dish
✗ The customer has to be a cooking expert
✗ A slightly unclear description and the dish is wrong
```

**The pain**:
- The bar is too high (no ordinary person orders like this)
- Unstable (an unclear detail and it fails)
- Unmaintainable (you have to describe it all again next time)

### 2023: prompt engineer is a well-paid job

**The scene**:
```
Customer (needs domain knowledge):
"Kung pao chicken, the traditional Sichuan way, tender chicken, crisp peanuts,
mildly spicy, balanced sweet and sour, not too salty."

Chef: understands the basic requirement, follows the standard process, but the details rely on experience

Result:
✓ Far better than 2022
✓ Success rate up to 70-80%
✗ The customer still has to know what “the traditional Sichuan way” means
✗ Different chefs read it differently, quality is unstable
```

**What the industry did**:
- A job called “ordering consultant” appeared (prompt engineer)
- $200,000 a year (real 2023 figure)
- Full-time work on “how to phrase it so the chef understands”

### 2024: the chef got smarter (better model reasoning)

**The scene**:
```
Customer (brief description):
"Kung pao chicken, mildly spicy, extra peanuts"

Chef (now able to reason):
"kung pao chicken" → knows the standard method on its own
"mildly spicy" → cuts the chili quantity
"extra peanuts" → 20% more

Result:
✓ The customer doesn't need to be an expert
✓ Stable quality (the chef has the fundamentals)
✓ Personalized (preferences get understood)
```

**The technical shift**:
- OpenAI o1 (reasoning)
- Claude 3 (long context + reasoning)
- The chef moves from “execute the order exactly” to “understand the intent”

### 2025: the head waiter takes over the whole flow (the Agent arrives)

**The scene**:
```
Customer (goal-oriented):
"Give me a proper Sichuan banquet, 8 people, budget 2000"

Head waiter (Agent) decides on its own:
1. [Check the cookbook] Open The Complete Sichuan Cookbook (Skills)
   → Settle the classic menu structure: 3 cold, 6 hot, 1 soup

2. [Write the list] Which ingredients are needed
   → Chicken, fish, shrimp, assorted vegetables...

3. [Go buy] Call the procurement system (MCP)
   → Fresh produce at the market, seafood from the supplier

4. [Build the schedule] Order of serving
   → Soup goes on first (3 hours)
   → Cold dishes made ahead (they keep)
   → Hot dishes counted back from serving time

5. [Coordinate the kitchen] Tell the head chef what to cook, in what order

6. [Check quality] Taste every dish, redo anything that isn't right

7. [Serve] Watch the pace, adjust as it goes

8. [Confirm] "The Sichuan banquet is fully served. Enjoy."

The customer never touches a detail; they just wait to eat
```

**The key jump**:
- From “responds when asked” to “executes on its own”
- From “confirm every step” to “just state the goal”
- From “a single task” to “the whole flow”

### 2026: multiple head waiters (multi-Agent systems)

**The scene**:
```
Customer: "A wedding banquet for 200, Chinese and Western, budget 100,000"

Restaurant manager (the main Agent):
"That's too big for one. I'll coordinate several head waiters"

Assign the work:
- Head waiter A (Chinese section): 50 Chinese dishes
- Head waiter B (Western section): Western cold buffet
- Head waiter C (pastry section): wedding cake and desserts
- Head waiter D (bar section): drinks and wine pairings
- Head waiter E (coordinator): controls the overall pace

Each head waiter works on its own:
- Checks its own cookbook at the same time (Skills)
- Goes to procurement at the same time (MCP)
- Preps ingredients and cooks in parallel
- Coordinates with the others ("Pastry section, the main courses are almost done, get ready to cut the cake")

Finally:
Manager: "The banquet is ready. Please take your seats."
```

**That is the concept behind Claude Cowork and multi-Agent collaboration.**

---

## MCP vs Skills, head to head

### The core distinction

```
┌─────────────────────────────────────────────────────┐
│ The distinction │
├─────────────────────────────────────────────────────┤
│ MCP (procurement)  = "what ingredients can I get"  (capability layer) │
│ Skills (cookbook)  = "I know how to cook"          (knowledge layer) │
│ Function Call      = "I have the basic tools"      (tool layer) │
└─────────────────────────────────────────────────────┘
```

### The detailed comparison

| Dimension | MCP (procurement) | Skills (cookbook shelf) | Function Calling (basic tools) |
|------|---------------|------------------|---------------------------|
| **Analogy** | Markets, suppliers | Cookbooks, recipes | Knife, pot, spatula |
| **What it does** | Gets outside resources | Supplies knowledge and method | Basic tool capability |
| **Problem it solves** | “What if there are no ingredients” | “What if I don't know how” | “How to cut and stir-fry” |
| **Token cost** | Very high (catalogs from 50 suppliers) | Very low (cookbook on demand) | Moderate |
| **When to use** | You need outside data | You need domain knowledge | Basic operations |
| **Safety** | High risk (a supplier can be a problem) | ✓ Safe (internal knowledge) | ✓ Containable |

### The three combinations

#### Case 1: MCP only, no Skills

```
The chef can buy, but can't cook:

Chef: "I can get lobster, truffle, foie gras, caviar"
(but has no idea how French cooking works, so he just wings it)

Result:
Ingredients: ★★★★★ (top grade)
Technique: ★ (can't cook)
The dish: ★★ (good ingredients wasted)

In real terms:
You have the GitHub API but no code review process
→ you can fetch the code, but you don't know how to review it
```

#### Case 2: Skills only, no MCP

```
The chef can cook, but can't get ingredients:

The French Bible says:
"Made with lobster, truffle, foie gras..."

But the chef can't leave the kitchen (no procurement)
He can only drool over the cookbook

Result:
Theory: ★★★★★ (perfect recipe)
Ingredients: ✗ (none)
The dish: ✗ (nothing comes out)

In real terms:
You have code review best practice, but you can't get the code
→ you know how to review, but there is nothing to review
```

#### Case 3: MCP + Skills (the two together)

```
The chef can both cook and buy:

Customer: "French seafood soup"

1. [Check the cookbook] Open The French Bible (Skills)
   → "you need: lobster, scallops, white wine, saffron..."
   → "method: simmer the stock 2 hours first, then add the seafood..."

2. [Go buy] Call MCP
   → lobster and scallops from the seafood supplier
   → white wine from the drinks merchant
   → saffron from the spice merchant

3. [Cook to the recipe]
   → strictly following the standard process in The French Bible
   → heat, time and ratios all controlled precisely

Result:
Ingredients: ★★★★★
Technique: ★★★★★
The dish: ★★★★★ (perfect)

In real terms:
A code review task
→ you know the review standard (Skills)
→ you can get the code (MCP calls the GitHub API)
→ the review runs cleanly
```

### Why Skills matter more than MCP

**The numbers (actual usage, 2025-2026)**:
```
100 customers order:
- 80: only need the cookbook (Skills)
  e.g. "make kung pao chicken" (the restaurant has the ingredients)

- 15: need the cookbook and procurement (Skills + MCP)
  e.g. "cook French" (needs imported ingredients)

- 5: only need procurement (MCP)
  e.g. "run to the shop for a bottle of soy sauce"

Conclusion: Skills cover 95% of the cases
```

**What that maps to in practice**:
```
Common AI tasks:
- Code review → needs Skills (the review standard), not MCP
- Writing docs → needs Skills (writing conventions), not MCP
- Architecture design → needs Skills (design patterns), not MCP
- Debugging a bug → needs Skills (debugging method), maybe MCP (reading logs)

A few tasks need MCP:
- Check a GitHub PR status
- Read data from a database
- Call a third-party API
```

---

## How Agent autonomy evolved

### Level 0: a passive tool (2022-2023)

```
Customer: "I want to eat"
Waiter: "What would you like?"
Customer: "Sichuan"
Waiter: "Which Sichuan dish?"
Customer: "Kung pao chicken"
Waiter: "How spicy?"
Customer: "Mild"
Waiter: "With peanuts?"
Customer: "Yes"
Waiter: "How many grams?"
Customer: "50 grams"
...

The trait: the customer has to specify every detail, like a remote-controlled toy
```

### Level 1: some understanding (2024)

```
Customer: "A kung pao chicken set"

Waiter (starts to reason):
"The set is a main, rice, a side and soup. Okay?"

Customer: "Okay"

The trait: understands common requests, but the plan needs a sign-off
```

### Level 2: semi-autonomous planning (early 2025)

```
Customer: "Sichuan food for 4"

Head waiter (starts planning):
"Right, I'd suggest:
- Cold: sliced beef and ox tongue in chili sauce
- Hot: kung pao chicken, mapo tofu, boiled fish
- Staple: rice
About ¥500, roughly 1 hour. Okay?"

Customer: "Okay"

The trait: can plan the whole thing, but needs approval
```

### Level 3: fully autonomous (late 2025 - 2026)

```
Customer: "A Sichuan banquet, 8 people, budget 2000, someone doesn't eat spicy"

Head waiter (fully autonomous Agent):
[internal monologue, doesn't bother the customer]
1. Check The Complete Sichuan Cookbook → fix the menu structure
2. Work out the budget split → ¥250 a head, reasonable
3. Special needs → 2 non-spicy dishes
4. Procurement list → get ingredients through MCP
5. Build the timetable → the soup goes on 3 hours ahead
6. Coordinate the kitchen → 3 stoves in parallel
7. Hold the quality → taste every dish
8. Watch the feedback → the customer is eating slowly, hold the next dish back

[40 minutes later]
Head waiter: "The Sichuan banquet is fully served. Enjoy."

The customer never intervenes; they said one sentence
```

**Capability comparison**:

| Capability | 2022 | 2024 | 2026 Agent |
|------|------|------|-----------|
| **Reads intent** | ✗ | ★★★ | ★★★★★ |
| **Plans on its own** | ✗ | ★★ | ★★★★★ |
| **Tool use** | ★ | ★★★ | ★★★★★ |
| **Quality assurance** | ✗ | ★★ | ★★★★★ |
| **Adjusts on the fly** | ✗ | ★ | ★★★★★ |
| **Needs confirmation** | Every step | The plan | Almost never |

---

## The performance techniques, mapped

### 1. Prompt Caching (prep, done ahead)

**Without caching**:
```
Customer 1 orders kung pao chicken:
chop scallion, ginger, garlic (5 min) → marinate the chicken (15 min) → fry the peanuts (10 min) → stir-fry (5 min)
Total: 35 minutes

Customer 2 orders kung pao chicken:
starts from zero again: chop scallion, ginger, garlic (5 min) → marinate the chicken (15 min)...
Total: 35 minutes

Customer 10: still 35 minutes
→ slow, expensive, wasted effort
```

**With caching (prep)**:
```
Prep it in the morning (these steps never change):
- a big tray of scallion, ginger and garlic, chopped (lasts all day)
- 5 portions of chicken, marinated (in the fridge)
- a big bowl of peanuts, fried (kept sealed)

Once an order comes in:
take the prepped ingredients → stir-fry (5 min) → serve
Total: 5 minutes (7x faster)

Cost:
Labour: 35 min × 10 orders = 350 min → 50 min (80% saved)
```

**The AI equivalent**:
```
System prompt, tool definitions (the fixed part) → cached ahead of time
Every conversation → reads the cache instead of reprocessing

Effect:
Cost down 90% ($3/M → $0.3/M)
Latency down 85% (5 s → 0.5 s)
```

### 2. Auto-Compact (clear the plates, free the table)

**Without compaction**:
```
The table (context window):
┌─────────────────────────────────┐
│ empty1 | empty2 | empty3 | ... │
│ empty10 | empty20 | the dish being eaten │
│ empty50 | ... | empty90 | empty100│
└─────────────────────────────────┘

The problem:
- 100 plates fill the table (and the table costs rent)
- The waiter has to walk around them to serve (slow)
- The customer struggles to find the dish being eaten (noise)
```

**Compaction (clearing the plates)**:
```
The waiter clears up:
- empty plates taken away
- only the dishes being eaten plus the order record stay

Result:
┌─────────────────────────────────┐
│ order record | dish being eaten 1 │
│ dish being eaten 2 | dish being eaten 3 │
│ [a lot of space] │
└─────────────────────────────────┘

100 plates → 25 plates

Effect:
- Rent down 75% (cost)
- Serving is faster (lower latency)
- Easy to find a dish (better experience)
```

**The AI equivalent**:
```
A long conversation history (800K tokens) → compacted into a summary (200K)

Effect:
Cost down 60-75%
Latency down 50%
```

### 3. Skills loaded on demand (carry only the cookbook you need)

**The old way (carry everything = the MCP way)**:
```
The chef walks into the kitchen with 50 cookbooks on his back:
The Complete Sichuan Cookbook, Selected Cantonese Dishes, The French Bible
  Japanese Cuisine Encyclopedia, Korean Cooking, Southeast Asian Flavors
  The Baking Compendium, Western Table Manners...

Customer orders: "kung pao chicken"

Chef:
opens book 1 (Sichuan) → "Found it."
But the other 49 still ride along (they take space and they are heavy)

The problem:
- Heavy token use (information from 50 books has to be given to the AI)
- Slow response (49 irrelevant books have to be filtered out)
- Easy to confuse (French technique leaks into Sichuan)
```

**The new way (load on demand = the Skills way)**:
```
Customer orders: "kung pao chicken"

Head waiter (inference layer):
"That's Sichuan" → hands the chef only The Complete Sichuan Cookbook

Chef:
one book, opened straight to kung pao chicken
back on the shelf once it's done

Next table orders: "French seafood soup"
Head waiter: swaps in The French Bible

Effect:
- 98% fewer tokens (50 books → 1)
- Faster response (nothing else to page through)
- More focus (French technique won't end up in a Sichuan dish)
```

### 4. RAG retrieval (an index for the cookbooks)

**The old way**:
```
The restaurant has 1000 cookbooks. Page through all of them every time?
→ far too slow.

Customer: "I feel like seafood"
The chef pages through 1000 books for every seafood dish → 1 hour
```

**The RAG way**:
```
Build an index:
seafood → The Complete Sichuan Cookbook ch. 30, Selected Cantonese Dishes ch. 5, French Cooking ch. 12

Customer: "I feel like seafood"
Head waiter:
1. Checks the index (1 second) → 3 relevant chapters
2. Hands the chef just those 3 chapters (precise)
3. Done fast

Effect:
1000 books → 3 chapters
100x faster
```

---

## A full meal, start to finish

### Example: a Sichuan banquet for 8 (2026, the Agent era)

```
T-0 min: the customer walks in
─────────────────────────────────────
Customer: "A Sichuan banquet, 8 people, budget 2000,
      2 of them can't eat spicy, and no beef"

Head waiter: "Certainly. One moment."

T+1 min: the head waiter plans (the inference layer at work)
─────────────────────────────────────
Head waiter (deciding fast, silently):

1. [Check the cookbook] Open The Complete Sichuan Cookbook (Skills)
   → classic banquet structure: 3 cold, 6 hot, 1 soup, 2 staples

2. [Analyze the constraints]
   - Budget: ¥2000 ÷ 8 people = ¥250 a head (mid-to-high end)
   - Restriction: 2 can't eat spicy → at least 2 non-spicy dishes
   - Restriction: no beef → skip the sliced beef and ox tongue (it has beef)

3. [Design the menu]
   Cold: garlic pork slices, mouthwatering chicken, sour and spicy noodles
   Hot: kung pao chicken, steamed fish (not spicy), twice-cooked pork,
        mapo tofu, dry-fried green beans (not spicy), boiled shrimp
   Soup: hot and sour soup
   Staples: rice, dan dan noodles

4. [Check inventory]
   Have: chicken, pork, tofu, vegetables
   Missing: fish, shrimp, specialty seasonings

T+2 min: procurement (MCP at work)
─────────────────────────────────────
Head waiter → buyer: "Get me these ingredients"

Calling MCP:
- Seafood supplier API: 1 sea bass, 500g large shrimp
- Spice warehouse: Pixian doubanjiang, Sichuan peppercorns
- Check result: ✓ all in place

T+5 min: assign the kitchen (coordinating resources)
─────────────────────────────────────
Head waiter → head chef (the model):

"Cook in this order:
1. [Start now] hot and sour soup (simmer 40 minutes)
2. [Ahead of time] 3 cold dishes (they keep)
3. [Once guests arrive] steamed fish (8 minutes)
4. [Serve in sequence] the other hot dishes, one every 5 minutes
5. [Last] the staples

Stove assignment:
- Stove 1: soup (occupied the whole time)
- Stove 2: steaming (short and quick)
- Stove 3: hot dishes (fast stir-fry)"

T+10 min: the kitchen executes (the model layer at work)
─────────────────────────────────────
Head chef (Claude Opus):
[Stove 1] hot and sour soup → simmering...
[Stove 2] steamed fish, prepped → standing by
[Stove 3] cold dishes → garlic pork slices done ✓

Assistant chef:
mouthwatering chicken done ✓
sour and spicy noodles done ✓

3 cold dishes chilling, ready to serve

T+45 min: the guests arrive, serving begins
─────────────────────────────────────
Head waiter:
[Serve the cold dishes] 3 cold dishes plated and on the table ✓

Head chef:
[Stove 3] kung pao chicken → stir-frying...
→ taste → a little bland → add salt → taste again ✓
→ serve

[5 minutes later]
[Stove 2] steamed fish → water boiling, steam 8 minutes ✓
→ serve

[In sequence]
twice-cooked pork ✓ → mapo tofu ✓ → dry-fried green beans ✓ → boiled shrimp ✓

Head waiter watching:
"The guests are eating slowly, hold the soup and staples back 5 minutes"

T+70 min: done
─────────────────────────────────────
hot and sour soup ✓
rice, dan dan noodles ✓

Head waiter: "Your Sichuan banquet is fully served. Enjoy.
      Call me if you need anything."

Customer (satisfied):
"Not bad. I said one sentence the whole time,
 the head waiter arranged everything himself,
 and he remembered my restrictions."
```

**That is what Agent autonomy looks like.**

---

## The inference layer (the service team) is the core

### The common misunderstanding

```
✗ The wrong model: an AI system = the head chef (the model)

Most people think:
GPT-4 vs Claude Opus = chef A vs chef B
→ comparing who cooks better

What is actually being compared:
the OpenAI restaurant vs the Anthropic restaurant
= head chef + service team + management + optimization
```

### The actual competition

```
✓ The right model: an AI system = head chef + service team (inference layer)

The Anthropic restaurant (Claude Code):
- Head chef: Claude Opus (★★★★★)
- Head waiter: exceptionally capable (strong Agent skills)
- Service: a mature cookbook system (Skills)
- Optimization: Prompt Caching, Auto-Compact
- Cost: well optimized, good value

The OpenAI restaurant (ChatGPT):
- Head chef: GPT-4o (★★★★★)
- Head waiter: more traditional (average Agent skills)
- Service: only recently started using Skills (after 2025.12)
- Optimization: present, but behind Anthropic
- Cost: higher

The Google restaurant (Gemini):
- Head chef: Gemini Ultra (★★★★)
- Head waiter: traditional service
- Context: the largest (2M), like an oversized table
- Specialty: multimodal (can read images)
```

**Conclusion**:
> The head chef (the model) is the same class, but the service team (the inference layer) decides the meal.
>
> That is why “the inference layer is the engine of evolution”

---

## The key takeaways

### 1. The layers are clean

```
Customer layer (the user)
    ↓ "I want a Sichuan banquet"
Service layer (inference layer) ← the most overlooked, the most important
    ↓ understand + plan + optimize
Execution layer (the model)
    ↓ cooking (generation)
Tool layer (MCP + Skills)
    ↓ ingredients + cookbook
```

### 2. What actually separates MCP from Skills

```
MCP = the ability to buy = "what can I get"
Skills = cooking knowledge = "I know how"

MCP alone: ingredients but no technique → waste
Skills alone: technique but no ingredients → nothing to cook today

Best case: MCP + Skills
(though 80% of tasks need only Skills)
```

### 3. Agent autonomy is the real jump

```
2022: the customer has to be a cooking expert (every step spelled out)
2023: the customer has to know the jargon (detailed description)
2024: the customer speaks roughly (the chef understands)
2025: the customer states the goal (the head waiter handles it)
2026: the customer states the need (several head waiters work together)

→ from a remote-controlled toy to a colleague who acts on his own
```

### 4. Performance is an engineering problem

```
The craft of running a restaurant:
✓ Prep ahead (Caching) → 7x faster
✓ Clear the plates (Compact) → 75% less rent
✓ Carry only the cookbook you need (Skills) → 98% fewer tokens
✓ A good index (RAG) → 100x faster

→ not one technique, but a combination
```

### 5. The pattern: the bar keeps dropping

```
2022: only experts could use it (only a cooking expert could order)
2026: anyone can (just state the need)

→ AI is moving from a specialist tool to a general assistant
```

---

## Mapping: technical terms ↔ the restaurant

| Technical term | In the restaurant | What it means |
|---------|---------|------|
| **User** | Customer | states the need |
| **Inference layer** | Head waiter + service team | understands the request, plans, optimizes |
| **AI model** | Head chef | the core capability (generating content) |
| **Model parameters** | The chef's skill / brain | GPT-4, Claude Opus |
| **Context window** | The chef's memory | how many dishes he can hold |
| **GPU** | Stove | compute; more heat, faster |
| **Power** | Fuel | how many stoves you can light |
| **Skills** | The cookbook shelf | knowledge, method, best practice |
| **MCP** | The procurement system | getting ingredients and resources from outside |
| **Function Calling** | The basic tools | knife, pot, spatula (the fundamentals) |
| **Prompt** | How you order | detailed in 2022, one line in 2026 |
| **Prompt Caching** | Prep ahead | scallion, ginger and garlic chopped in advance |
| **Auto-Compact** | Clearing the plates | freeing table space |
| **RAG** | The cookbook index | finding the right recipe fast |
| **Agent** | An autonomous head waiter | state the goal, the whole flow gets handled |
| **Multi-Agent** | Several head waiters | a wedding needs several of them splitting the work |
| **Token** | Table space | more plates, higher bill |
| **Latency** | Waiting time | from ordering to serving |
| **Cost** | The bill | rent + labour + ingredients |

---

## Worked examples

### Example 1: code review (Skills only)

```
Customer (a developer):
"Review this code for me"

Head waiter (Claude Code Agent):
1. [Identify the task] this is a code review
2. [Check the cookbook] Open the Code Review Standard (Skills)
   → checklist: security, performance, maintainability...
3. [No procurement needed] the code is already here, MCP isn't required
4. [Run the review] the head chef checks it against the standard
5. [Report] "Found 3 security issues, 2 performance suggestions..."

No MCP: the ingredients (the code) are already on hand
Only Skills: knowing how to review
```

### Example 2: analyzing GitHub trends (MCP + Skills)

```
Customer: "Analyze the trend of AI projects on GitHub over the past week"

Head waiter (Agent):
1. [Identify the task] needs outside data plus analysis
2. [Check the cookbook] Data Analysis Methods (Skills)
   → knows the dimensions: star growth, forks, language...
3. [Go buy] call the GitHub API (MCP)
   → gets the last week of project data
4. [Analyze per the cookbook] the head chef processes the data with that method
5. [Report] "Top 10 projects, growth trend charts..."

MCP needed: to get the GitHub data
Skills needed: to know how to analyze a trend
```

### Example 3: writing technical docs (Skills only)

```
Customer: "Write an API doc for me"

Head waiter:
1. [Check the cookbook] Technical Writing Standards (Skills)
   → standard structure: overview, endpoints, parameters, examples...
2. [No procurement needed] the information is already here
3. [Generate from the template] the head chef writes to the standard
4. [Quality check] format, completeness
5. [Output] a complete API doc

No MCP needed
Only Skills: knowing how to write technical docs
```

---

## Why the restaurant

### 1. An everyday scene, easy to follow

- Everyone has been to a restaurant
- Ordering and serving are familiar
- It builds a mental model quickly

### 2. The mapping holds, the key concepts stay clear

- **Layering**: front of house (inference layer) vs kitchen (the model)
- **Resource types**: ingredients (capability) vs cookbook (knowledge)
- **Evolution**: how ordering changed = how prompts changed

### 3. It surfaces what people skip

- **Why the inference layer matters** (the service team outranks the chef himself)
- **Skills vs MCP** (knowledge vs capability)
- **Agent autonomy** (head waiter vs waiter)

---

## Using this frame for the chapters ahead

When you read the technical chapters that follow, keep this restaurant frame in mind:

- See “context window” → think “table size, memory”
- See “prompt engineering” → think “how ordering evolved”
- See “Skills” → think “the cookbook shelf”
- See “MCP” → think “the procurement system”
- See “Agent” → think “a head waiter who acts on his own”
- See “inference layer” → think “the service team”

That will get you through the technical material faster.

---

## Further questions

### Q1: Why not skip the service team and keep only the head chef (the model)?

```
It's like:
✗ The customer shouts straight into the kitchen: "Make me kung pao chicken!"

The problem:
- The chef can't hear you properly (misreads the request)
- The chef doesn't know your restrictions (no context)
- The chef doesn't optimize cost (wastes ingredients)
- Nobody coordinates (several dishes collapse at once)

✓ You need the service team:
- to understand the request
- to remember preferences
- to optimize the sequence
- to coordinate resources
```

### Q2: Local AI (Clawdbot) vs cloud AI (Claude Code)

```
The cloud restaurant (Claude Code):
- a large restaurant, fully equipped
- a top-class chef (Opus 4.5)
- plenty of stoves (unlimited GPU)
- but: needs a network, has latency, charges by usage

The home kitchen (Clawdbot):
- a small kitchen, a Mac mini (M4 Pro)
- a decent chef (local DeepSeek-R1)
- limited stoves (36GB unified memory)
- but: it's at home, always available, free to run

When each applies:
- hosting an important client → the cloud restaurant (complex work)
- cooking dinner → the home kitchen (simple work)
```

### Q3: Why do Skills matter more than MCP?

```
The numbers (out of 100 orders):

Cookbook only (Skills): 80
- "make kung pao chicken" (the restaurant has the ingredients)
- "write a doc" (the information is there)
- "review the code" (the code is there)

Cookbook + procurement (Skills + MCP): 15
- "cook French" (needs imported ingredients)
- "analyze GitHub trends" (needs API data)

Procurement only (MCP): 5
- "run to the shop for a bottle of soy sauce" (a simple fetch)

Conclusion:
Skills cover 95% of the cases
MCP is needed in only 20%

→ Skills are the foundation, MCP is the supplement
```

---
