import { createSuite } from './core/core';

async function main() {
  await createSuite('Setting cell meta', [
    {
      name: 'Prototype (currently used structure) -> .getCellMetaLazy()',
      setup: function() {
        this.cellMetaManager = new CellMetaManagerPrototype();
        testSetup.call(this);
      },
      fn: function() {
        const cellMeta = this.cellMetaManager.getCellMetaLazy(this.row, this.column);
        const prop = CellMetaManagerPrototype.AVAILABLE_OPTIONS[this.row % CellMetaManagerPrototype.AVAILABLE_OPTIONS.length];

        cellMeta[prop] = this.row;

        testCycle.call(this);
      },
      teardown: function() {
        this.cellMetaManager = null;
      },
    },
    {
      name: 'Prototype Map as cache holder -> .getCellMetaLazy()',
      setup: function() {
        this.cellMetaManager = new CellMetaManagerPrototypeMapHolder();
        testSetup.call(this);
      },
      fn: function() {
        const cellMeta = this.cellMetaManager.getCellMetaLazy(this.row, this.column);
        const prop = CellMetaManagerPrototypeMapHolder.AVAILABLE_OPTIONS[this.row % CellMetaManagerPrototypeMapHolder.AVAILABLE_OPTIONS.length];

        cellMeta[prop] = this.row;

        testCycle.call(this);
      },
      teardown: function() {
        this.cellMetaManager = null;
      },
    },
    {
      name: 'Prototype Using transpiled es6 classes, simplified structure + new Proxy -> .getCellMetaLazy()',
      setup: function() {
        this.cellMetaManager = new CellMetaManagerPrototypeClass();
        testSetup.call(this);
      },
      fn: function() {
        const cellMeta = this.cellMetaManager.getCellMetaLazy(this.row, this.column);
        const prop = CellMetaManagerPrototypeClass.AVAILABLE_OPTIONS[this.row % CellMetaManagerPrototypeClass.AVAILABLE_OPTIONS.length];

        cellMeta[prop] = this.row;

        testCycle.call(this);
      },
      teardown: function() {
        this.cellMetaManager = null;
      },
    },
    {
      name: 'new Proxy -> .getCellMetaLazy()',
      setup: function() {
        this.cellMetaManager = new CellMetaManagerPrototypeProxy();
        testSetup.call(this);
      },
      fn: function() {
        const cellMeta = this.cellMetaManager.getCellMetaLazy(this.row, this.column);
        const prop = CellMetaManagerPrototypeProxy.AVAILABLE_OPTIONS[this.row % CellMetaManagerPrototypeProxy.AVAILABLE_OPTIONS.length];

        cellMeta[prop] = this.row;

        testCycle.call(this);
      },
      teardown: function() {
        this.cellMetaManager = null;
      },
    },
    // {
    //   name: 'Object.defineProperty -> .getCellMetaLazy()',
    //   setup: function() {
    //     this.cellMetaManager = new CellMetaManagerPrototypeDefineProperties();
    //     testSetup.call(this);
    //   },
    //   fn: function() {
    //     const cellMeta = this.cellMetaManager.getCellMetaLazy(this.row, this.column);
    //     const prop = CellMetaManagerPrototypeDefineProperties.AVAILABLE_OPTIONS[this.row % CellMetaManagerPrototypeDefineProperties.AVAILABLE_OPTIONS.length];
    //
    //     cellMeta[prop] = this.row;
    //
    //     testCycle.call(this);
    //   },
    //   teardown: function() {
    //     this.cellMetaManager = null;
    //   },
    // },
    {
      name: 'Wrapper -> .getCellMetaLazy()',
      setup: function() {
        this.cellMetaManager = new CellMetaManagerPrototypeWrapper();
        testSetup.call(this);
      },
      fn: function() {
        const cellMeta = this.cellMetaManager.getCellMetaLazy(this.row, this.column);
        const prop = CellMetaManagerPrototypeWrapper.AVAILABLE_OPTIONS[this.row % CellMetaManagerPrototypeWrapper.AVAILABLE_OPTIONS.length];

        cellMeta.set(prop, this.row);

        testCycle.call(this);
      },
      teardown: function() {
        this.cellMetaManager = null;
      },
    },
  ]);

  await createSuite('Setting cell meta (preallocated cell metas)', [
    {
      name: 'Prototype -> .getCellMeta()',
      setup: function() {
        this.cellMetaManager = new CellMetaManagerPrototype();
        this.rowsLimit = 100;
        testSetup.call(this);

        for (var row = 0; row < 100; row++) {
          for (var column = 0; column < 100; column++) {
            this.cellMetaManager.createCellMeta(row, column);
          }
        }
      },
      fn: function() {
        const cellMeta = this.cellMetaManager.getCellMeta(this.row, this.column);
        const prop = CellMetaManagerPrototype.AVAILABLE_OPTIONS[this.row % CellMetaManagerPrototype.AVAILABLE_OPTIONS.length];

        cellMeta[prop] = this.row;

        testCycle.call(this);
      },
      teardown: function() {
        this.cellMetaManager = null;
      },
    },
    {
      name: 'Prototype Map as cache holder -> .getCellMeta()',
      setup: function() {
        this.cellMetaManager = new CellMetaManagerPrototypeMapHolder();
        this.rowsLimit = 100;
        testSetup.call(this);

        for (var row = 0; row < 100; row++) {
          for (var column = 0; column < 100; column++) {
            this.cellMetaManager.createCellMeta(row, column);
          }
        }
      },
      fn: function() {
        const cellMeta = this.cellMetaManager.getCellMeta(this.row, this.column);
        const prop = CellMetaManagerPrototypeMapHolder.AVAILABLE_OPTIONS[this.row % CellMetaManagerPrototypeMapHolder.AVAILABLE_OPTIONS.length];

        cellMeta[prop] = this.row;

        testCycle.call(this);
      },
      teardown: function() {
        this.cellMetaManager = null;
      },
    },
    {
      name: 'Prototype Using transpiled es6 classes, simplified structure + new Proxy -> .getCellMeta()',
      setup: function() {
        this.cellMetaManager = new CellMetaManagerPrototypeClass();
        this.rowsLimit = 100;
        testSetup.call(this);

        for (var row = 0; row < 100; row++) {
          for (var column = 0; column < 100; column++) {
            this.cellMetaManager.createCellMeta(row, column);
          }
        }
      },
      fn: function() {
        const cellMeta = this.cellMetaManager.getCellMeta(this.row, this.column);
        const prop = CellMetaManagerPrototypeClass.AVAILABLE_OPTIONS[this.row % CellMetaManagerPrototypeClass.AVAILABLE_OPTIONS.length];

        cellMeta[prop] = this.row;

        testCycle.call(this);
      },
      teardown: function() {
        this.cellMetaManager = null;
      },
    },

    {
      name: 'new Proxy -> .getCellMeta()',
      setup: function() {
        this.cellMetaManager = new CellMetaManagerPrototypeProxy();
        this.rowsLimit = 100;
        testSetup.call(this);

        for (var row = 0; row < 100; row++) {
          for (var column = 0; column < 100; column++) {
            this.cellMetaManager.createCellMeta(row, column);
          }
        }
      },
      fn: function() {
        const cellMeta = this.cellMetaManager.getCellMeta(this.row, this.column);
        const prop = CellMetaManagerPrototypeProxy.AVAILABLE_OPTIONS[this.row % CellMetaManagerPrototypeProxy.AVAILABLE_OPTIONS.length];

        cellMeta[prop] = this.row;

        testCycle.call(this);
      },
      teardown: function() {
        this.cellMetaManager = null;
      },
    },
    // {
    //   name: 'Object.defineProperty -> .getCellMeta()',
    //   setup: function() {
    //     this.cellMetaManager = new CellMetaManagerPrototypeDefineProperties();
    //     this.rowsLimit = 100;
    //     testSetup.call(this);
    //
    //     for (var row = 0; row < 100; row++) {
    //       for (var column = 0; column < 100; column++) {
    //         this.cellMetaManager.createCellMeta(row, column);
    //       }
    //     }
    //   },
    //   fn: function() {
    //     const cellMeta = this.cellMetaManager.getCellMeta(this.row, this.column);
    //     const prop = CellMetaManagerPrototypeDefineProperties.AVAILABLE_OPTIONS[this.row % CellMetaManagerPrototypeDefineProperties.AVAILABLE_OPTIONS.length];
    //
    //     cellMeta[prop] = this.row;
    //
    //     testCycle.call(this);
    //   },
    //   teardown: function() {
    //     this.cellMetaManager = null;
    //   },
    // },
    {
      name: 'Wrapper -> .getCellMeta()',
      setup: function() {
        this.cellMetaManager = new CellMetaManagerPrototypeWrapper();
        this.rowsLimit = 100;
        testSetup.call(this);

        for (var row = 0; row < 100; row++) {
          for (var column = 0; column < 100; column++) {
            this.cellMetaManager.createCellMeta(row, column);
          }
        }
      },
      fn: function() {
        const cellMeta = this.cellMetaManager.getCellMeta(this.row, this.column);
        const prop = CellMetaManagerPrototypeWrapper.AVAILABLE_OPTIONS[this.row % CellMetaManagerPrototypeWrapper.AVAILABLE_OPTIONS.length];

        cellMeta.set(prop, this.row);

        testCycle.call(this);
      },
      teardown: function() {
        this.cellMetaManager = null;
      },
    },
  ]);

  await createSuite('Getting cell meta', [
    {
      name: 'Prototype -> .getCellMetaLazy()',
      setup: function() {
        this.cellMetaManager = new CellMetaManagerPrototype();
        testSetup.call(this);
      },
      fn: function() {
        const cellMeta = this.cellMetaManager.getCellMetaLazy(this.row, this.column);
        const prop = CellMetaManagerPrototype.AVAILABLE_OPTIONS[this.row % CellMetaManagerPrototype.AVAILABLE_OPTIONS.length];
        const temp = [];

        temp.push(cellMeta[prop]);
        temp.length = 0;

        testCycle.call(this);
      },
      teardown: function() {
        this.cellMetaManager = null;
      },
    },
    {
      name: 'new Proxy -> .getCellMetaLazy()',
      setup: function() {
        this.cellMetaManager = new CellMetaManagerPrototypeProxy();
        testSetup.call(this);
      },
      fn: function() {
        const cellMeta = this.cellMetaManager.getCellMetaLazy(this.row, this.column);
        const prop = CellMetaManagerPrototypeProxy.AVAILABLE_OPTIONS[this.row % CellMetaManagerPrototypeProxy.AVAILABLE_OPTIONS.length];
        const temp = [];

        temp.push(cellMeta[prop]);
        temp.length = 0;

        testCycle.call(this);
      },
      teardown: function() {
        this.cellMetaManager = null;
      },
    },
    // {
    //   name: 'Object.defineProperty -> .getCellMetaLazy()',
    //   setup: function() {
    //     this.cellMetaManager = new CellMetaManagerPrototypeDefineProperties();
    //     testSetup.call(this);
    //   },
    //   fn: function() {
    //     const cellMeta = this.cellMetaManager.getCellMetaLazy(this.row, this.column);
    //     const prop = CellMetaManagerPrototypeDefineProperties.AVAILABLE_OPTIONS[this.row % CellMetaManagerPrototypeDefineProperties.AVAILABLE_OPTIONS.length];
    //     const temp = [];
    //
    //     temp.push(cellMeta[prop]);
    //     temp.length = 0;
    //
    //     testCycle.call(this);
    //   },
    //   teardown: function() {
    //     this.cellMetaManager = null;
    //   },
    // },
    {
      name: 'Wrapper -> .getCellMetaLazy()',
      setup: function() {
        this.cellMetaManager = new CellMetaManagerPrototypeWrapper();
        testSetup.call(this);
      },
      fn: function() {
        const cellMeta = this.cellMetaManager.getCellMetaLazy(this.row, this.column);
        const prop = CellMetaManagerPrototypeWrapper.AVAILABLE_OPTIONS[this.row % CellMetaManagerPrototypeWrapper.AVAILABLE_OPTIONS.length];
        const temp = [];

        temp.push(cellMeta[prop]);
        temp.length = 0;

        testCycle.call(this);
      },
      teardown: function() {
        this.cellMetaManager = null;
      },
    },
  ]);

  await createSuite('Getting cell meta (preallocated cell metas)', [
    {
      name: 'Prototype -> .getCellMetaLazy()',
      setup: function() {
        this.cellMetaManager = new CellMetaManagerPrototype();
        this.rowsLimit = 100;
        testSetup.call(this);

        for (var row = 0; row < 100; row++) {
          for (var column = 0; column < 100; column++) {
            this.cellMetaManager.createCellMeta(row, column);
          }
        }
      },
      fn: function() {
        const cellMeta = this.cellMetaManager.getCellMeta(this.row, this.column);
        const prop = CellMetaManagerPrototype.AVAILABLE_OPTIONS[this.row % CellMetaManagerPrototype.AVAILABLE_OPTIONS.length];
        const temp = [];

        temp.push(cellMeta[prop]);
        temp.length = 0;

        testCycle.call(this);
      },
      teardown: function() {
        this.cellMetaManager = null;
      },
    },
    {
      name: 'new Proxy -> .getCellMetaLazy()',
      setup: function() {
        this.cellMetaManager = new CellMetaManagerPrototypeProxy();
        this.rowsLimit = 100;
        testSetup.call(this);

        for (var row = 0; row < 100; row++) {
          for (var column = 0; column < 100; column++) {
            this.cellMetaManager.createCellMeta(row, column);
          }
        }
      },
      fn: function() {
        const cellMeta = this.cellMetaManager.getCellMeta(this.row, this.column);
        const prop = CellMetaManagerPrototypeProxy.AVAILABLE_OPTIONS[this.row % CellMetaManagerPrototypeProxy.AVAILABLE_OPTIONS.length];
        const temp = [];

        temp.push(cellMeta[prop]);
        temp.length = 0;

        testCycle.call(this);
      },
      teardown: function() {
        this.cellMetaManager = null;
      },
    },
    // {
    //   name: 'Object.defineProperty -> .getCellMetaLazy()',
    //   setup: function() {
    //     this.cellMetaManager = new CellMetaManagerPrototypeDefineProperties();
    //     this.rowsLimit = 100;
    //     testSetup.call(this);
    //
    //     for (var row = 0; row < 100; row++) {
    //       for (var column = 0; column < 100; column++) {
    //         this.cellMetaManager.createCellMeta(row, column);
    //       }
    //     }
    //   },
    //   fn: function() {
    //     const cellMeta = this.cellMetaManager.getCellMeta(this.row, this.column);
    //     const prop = CellMetaManagerPrototypeDefineProperties.AVAILABLE_OPTIONS[this.row % CellMetaManagerPrototypeDefineProperties.AVAILABLE_OPTIONS.length];
    //     const temp = [];
    //
    //     temp.push(cellMeta[prop]);
    //     temp.length = 0;
    //
    //     testCycle.call(this);
    //   },
    //   teardown: function() {
    //     this.cellMetaManager = null;
    //   },
    // },
    {
      name: 'Wrapper -> .getCellMetaLazy()',
      setup: function() {
        this.cellMetaManager = new CellMetaManagerPrototypeWrapper();
        this.rowsLimit = 100;
        testSetup.call(this);

        for (var row = 0; row < 100; row++) {
          for (var column = 0; column < 100; column++) {
            this.cellMetaManager.createCellMeta(row, column);
          }
        }
      },
      fn: function() {
        const cellMeta = this.cellMetaManager.getCellMeta(this.row, this.column);
        const prop = CellMetaManagerPrototypeWrapper.AVAILABLE_OPTIONS[this.row % CellMetaManagerPrototypeWrapper.AVAILABLE_OPTIONS.length];
        const temp = [];

        temp.push(cellMeta[prop]);
        temp.length = 0;

        testCycle.call(this);
      },
      teardown: function() {
        this.cellMetaManager = null;
      },
    },
  ]);
};

main();
