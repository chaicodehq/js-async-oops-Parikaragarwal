/**
 * 🚀 Indian Startup Incubator - Capstone: OOP + Async + this
 *
 * Indian startup incubator ka full management system banana hai! Yeh
 * CAPSTONE challenge hai jisme saare concepts combine honge — classes,
 * private fields, async/await, Promise.allSettled, iterators, static
 * methods, aur `this` keyword. Startups ko admit karo, mentors assign
 * karo, demo day conduct karo — sab kuch ek system mein!
 *
 * Class: Startup
 *
 *   Private Fields:
 *     #funding - Total funding raised (starts at 0)
 *
 *   constructor(name, founder, domain)
 *     - this.name = name
 *     - this.founder = founder
 *     - this.domain = domain (must be one of: "fintech", "edtech", "healthtech", "foodtech")
 *     - this.#funding = 0
 *     - this.founded = new Date().toISOString()
 *     - If domain invalid, throw Error("Invalid domain! Choose from: fintech, edtech, healthtech, foodtech")
 *
 *   get funding()
 *     - Returns current #funding amount
 *
 *   raiseFunding(amount)
 *     - amount must be > 0, otherwise return -1
 *     - Adds amount to #funding
 *     - Returns new total #funding
 *
 *   getPitch()
 *     - Returns formatted pitch string using `this`:
 *       "${this.name} by ${this.founder} | Domain: ${this.domain} | Funding: Rs.${this.funding}"
 *
 *
 * Class: Incubator
 *
 *   Private Fields:
 *     #startups - Array of startup objects with metadata
 *     #mentors  - Array of mentor assignments
 *
 *   constructor(name, maxStartups)
 *     - this.name = name
 *     - this.maxStartups = maxStartups (must be > 0)
 *     - this.#startups = []
 *     - this.#mentors = []
 *
 *   async admitStartup(startup)
 *     - Returns a Promise (simulate async admission process with small delay)
 *     - Validates: startup must be an instance of Startup (use instanceof)
 *     - If not Startup instance: reject/throw Error("Invalid startup!")
 *     - If already admitted (check by name): reject/throw Error("Startup already admitted!")
 *     - If at capacity (#startups.length >= maxStartups): reject/throw Error("Incubator full!")
 *     - If valid: push { startup, admittedAt: new Date().toISOString(), demoCompleted: false }
 *     - Returns { success: true, message: "${startup.name} admitted to ${this.name}!" }
 *
 *   removeStartup(name)
 *     - Removes startup by name from #startups
 *     - Returns true if found and removed
 *     - Returns false if not found
 *
 *   async assignMentor(startupName, mentor)
 *     - Returns a Promise (simulate async process)
 *     - mentor is { name, expertise } object
 *     - Validates startup exists in #startups
 *     - If startup not found: reject/throw Error("Startup not found!")
 *     - If valid: push { startupName, mentor, assignedAt: new Date().toISOString() }
 *       to #mentors
 *     - Returns { success: true, message: "${mentor.name} assigned to ${startupName}" }
 *
 *   async conductDemo(startupName)
 *     - Returns a Promise (simulate demo day with delay)
 *     - Validates startup exists
 *     - If not found: reject/throw Error("Startup not found!")
 *     - Marks demoCompleted = true for the startup
 *     - Returns {
 *         startup: startupName,
 *         score: Math.floor(Math.random() * 41) + 60,  // 60-100
 *         feedback: random from ["Bahut badhiya!", "Accha hai, improve karo", "Investors impressed!"],
 *         timestamp: new Date().toISOString()
 *       }
 *
 *   async batchProcess(startups)
 *     - Takes array of Startup instances
 *     - Admits EACH startup using admitStartup
 *     - Uses Promise.allSettled so that individual failures don't stop others
 *     - Returns array of results: each { status: "fulfilled", value } or { status: "rejected", reason }
 *
 *   getStartupsByDomain(domain)
 *     - Returns array of startups filtered by domain
 *     - Returns the Startup instances (not the wrapper objects)
 *     - Returns empty array if no matches
 *
 *   getTopFunded(n)
 *     - Returns top n startups sorted by funding (highest first)
 *     - Returns the Startup instances
 *     - If n > total startups, return all sorted by funding
 *     - If n <= 0 or no startups, return empty array
 *
 *   [Symbol.iterator]()
 *     - Makes incubator iterable over its startups
 *     - Yields each Startup instance (not wrapper objects)
 *
 *   static createFromConfig(config)
 *     - Factory method: creates an Incubator from config object
 *     - config: { name, maxStartups }
 *     - Returns new Incubator(config.name, config.maxStartups)
 *     - If config invalid (missing name or maxStartups), throw Error("Invalid config!")
 *
 *
 * Function: runDemoDay(incubator)
 *   - async function (standalone, not a method)
 *   - Takes an Incubator instance
 *   - Conducts demo for ALL startups in the incubator (use iterator)
 *   - Collects results using Promise.allSettled
 *   - Returns {
 *       incubator: incubator.name,
 *       totalStartups: count,
 *       results: array of demo results,
 *       timestamp: new Date().toISOString()
 *     }
 *
 * Rules:
 *   - Startup must validate domain in constructor
 *   - Private fields must use # syntax
 *   - All async methods must return Promises
 *   - Use instanceof for type checking
 *   - Symbol.iterator must yield Startup instances
 *   - batchProcess must use Promise.allSettled
 *   - runDemoDay must work with the iterator
 *   - `this` must be used correctly in getPitch and all methods
 *   - Error messages must match exactly as specified
 *
 * @example
 *   const startup = new Startup("PayEasy", "Rahul", "fintech");
 *   startup.raiseFunding(5000000);
 *   startup.getPitch();
 *   // => "PayEasy by Rahul | Domain: fintech | Funding: Rs.5000000"
 *
 * @example
 *   const incubator = new Incubator("T-Hub", 10);
 *   const s1 = new Startup("EduLearn", "Priya", "edtech");
 *   await incubator.admitStartup(s1);
 *   // => { success: true, message: "EduLearn admitted to T-Hub!" }
 *
 * @example
 *   const incubator = Incubator.createFromConfig({ name: "Nexus", maxStartups: 5 });
 *   const startups = [
 *     new Startup("HealthFirst", "Amit", "healthtech"),
 *     new Startup("FoodDash", "Neha", "foodtech")
 *   ];
 *   const results = await incubator.batchProcess(startups);
 *   // => [{ status: "fulfilled", value: {...} }, { status: "fulfilled", value: {...} }]
 *
 * @example
 *   for (const startup of incubator) {
 *     console.log(startup.name);  // iterates over all admitted startups
 *   }
 *
 * @example
 *   const demoResults = await runDemoDay(incubator);
 *   // => { incubator: "T-Hub", totalStartups: 2, results: [...], timestamp: "..." }
 */
export class Startup {
  #funding;
 
  constructor(name, founder, domain) {
    const domainSet = new Set(["fintech", "edtech", "healthtech", "foodtech"]);
    if (!domainSet.has(domain))
    {
      throw new Error("Invalid domain! Choose from: fintech, edtech, healthtech, foodtech");
    }
    this.name = name;
    this.founder = founder;
    this.domain = domain  
    this.#funding = 0;
    this.founded = new Date().toISOString();
  }

  get funding() {
    return this.#funding;
  }

  raiseFunding(amount) {
    if (typeof(amount) !== 'number' || amount <= 0)
    {
      return -1;  
    }
    this.#funding += amount;
    return this.#funding;
  }

  getPitch() {
    return `${this.name} by ${this.founder} | Domain: ${this.domain} | Funding: Rs.${this.funding}`;
  }
}

export class Incubator {
  #startups;
  #mentors;

  constructor(name, maxStartups) {
    if (typeof (maxStartups) !== 'number' || maxStartups <= 0)
    {
      throw new Error('Invalid Max StartUps Number');  
    }
    this.name = name;
    this.maxStartups = maxStartups;
    this.#startups = [];
    this.#mentors = [];
  }

  async admitStartup(startup) {
    return await new Promise((res, rej) => {
      setTimeout(() => {
        if (!(startup instanceof Startup))
        {
          return rej(new Error("Invalid startup!"));
        }
        if (this.#startups.find((el) => el.startup.name === startup.name))
        {
          return rej(new Error("Startup already admitted!"));
        }
        if (this.#startups.length === this.maxStartups)
        {
          return rej(new Error("Incubator full!"))
        }
        this.#startups.push({
            startup,
            admittedAt: new Date().toISOString(),
            demoCompleted: false
          }
        );
        
        return res(
          {
            success: true,
            message: `${startup.name} admitted to ${this.name}!`
          }
        )
      }, 50);
    });
  }

  removeStartup(name) {
    const index = this.#startups.findIndex((el) => {
     return el.startup.name === name;
    });
    if (index === -1)
    {
      return false;
    }
    
    this.#startups[index]=this.#startups[this.#startups.length - 1];
    
    this.#startups.pop();
    return true;
  }

  async assignMentor(startupName, mentor) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        const index = this.#startups.findIndex((el) => {
         return el.startup.name ===startupName;
        });
        if (index === -1)
        {
          return rej(new Error("Startup not found!"));
        }
        this.#mentors.push({
            startupName,
            mentor,
            assignedAt: new Date().toISOString()
          }
        );
        return res({
            success: true,
            message: `${mentor.name} assigned to ${startupName}`
          }
        )
      }, 50);
    });
  }

  async conductDemo(startupName) {
    const feedBackTypes = ["Bahut badhiya!", "Accha hai, improve karo", "Investors impressed!"];
    return new Promise((res, rej) => {
      setTimeout(() => {
        const index = this.#startups.findIndex((el) => {
         return el.startup.name ===startupName;
        });
        if (index === -1)
        {
          return rej(new Error("Startup not found!"));
        }
        
        return res({
         startup: startupName,
         score: Math.floor(Math.random() * 41) + 60,
         feedback: feedBackTypes[Math.floor(Math.random()*3)],
         timestamp: new Date().toISOString()
       });
      }, 50);
    });
  }

  async batchProcess(startups) {
    const batch = startups.map((startup) => {
      return this.admitStartup(startup);
    });
    
    return Promise.allSettled(batch);
  }

  getStartupsByDomain(domain) {
    return this.#startups.filter((stup) => {
      return stup.startup.domain === domain;
    }).map((el) => el.startup);
  }

  getTopFunded(n) {
    if (n <= 0 || this.#startups.length===0)
    {
      return [];
    }
    
    let rankedstartups = (this.#startups).toSorted((a, b) => {
      return b.startup.funding - a.startup.funding;
    }).map((el) => el.startup);
    
    rankedstartups.length = Math.min(n, rankedstartups.length);
    return rankedstartups;
  }

  *[Symbol.iterator]() {
    for(const obj of this.#startups)
    {
      yield obj.startup;
    }
  }

  static createFromConfig(config) {
    const { name, maxStartups } = config;
    if (!name || !maxStartups
      || typeof (name) !== 'string'
      || typeof (maxStartups) !== 'number'
      || name ==='')
    {
      throw new Error("Invalid config!");
    }
    
    return new Incubator(name, maxStartups);
  }
}

export async function runDemoDay(incubator) {
  const demoBatch = [...incubator].map((el) => {
    return incubator.conductDemo(el.name);
  });
  
  const demoDayResult = await Promise.allSettled(demoBatch);
  return   {
     incubator: incubator.name,
     totalStartups: demoBatch.length,
     results: demoBatch,
     timestamp: new Date().toISOString()
   }
}
