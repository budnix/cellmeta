import { CellMetaManagerPrototype } from './modules/prototype';
import { CellMetaManagerPrototypeMapHolder } from './modules/prototype-map-holder';
import { CellMetaManagerPrototypeClass } from './modules/prototype-class';
import { CellMetaManagerPrototypeProxy } from './modules/prototype-proxy';
import { CellMetaManagerPrototypeWrapper } from './modules/prototype-wrapper';

const cellMetaManagerPrototype = new CellMetaManagerPrototype();
const cellMetaManagerPrototypeMapHolder = new CellMetaManagerPrototypeMapHolder();
const cellMetaManagerPrototypeClass = new CellMetaManagerPrototypeClass();
const cellMetaManagerPrototypeProxy = new CellMetaManagerPrototypeProxy();
const cellMetaManagerPrototypeWrapper = new CellMetaManagerPrototypeWrapper();

require('matcha');

suite('Make Tea', function () {
  bench('[set] prototype', function(next) {
    for (let row = 0; row < 100; row++) {
      for (let column = 0; column < 100; column++) {
        const cellMeta = cellMetaManagerPrototype.getCellMetaLazy(row, column);
        const prop = CellMetaManagerPrototype.AVAILABLE_OPTIONS[row % CellMetaManagerPrototype.AVAILABLE_OPTIONS.length];

        cellMeta[prop] = row;
      }
    }
    next();
  });

  bench('[set] prototype map holder', function(next) {
    for (let row = 0; row < 100; row++) {
      for (let column = 0; column < 100; column++) {
        const cellMeta = cellMetaManagerPrototypeMapHolder.getCellMetaLazy(row, column);
        const prop = CellMetaManagerPrototypeMapHolder.AVAILABLE_OPTIONS[row % CellMetaManagerPrototypeMapHolder.AVAILABLE_OPTIONS.length];

        cellMeta[prop] = row;
      }
    }
    next();
  });

  bench('[set] prototype class', function(next) {
    for (let row = 0; row < 100; row++) {
      for (let column = 0; column < 100; column++) {
        const cellMeta = cellMetaManagerPrototypeClass.getCellMetaLazy(row, column);
        const prop = CellMetaManagerPrototypeClass.AVAILABLE_OPTIONS[row % CellMetaManagerPrototypeClass.AVAILABLE_OPTIONS.length];

        cellMeta[prop] = row;
      }
    }
    next();
  });

  bench('[set] prototype new proxy', function(next) {
    for (let row = 0; row < 100; row++) {
      for (let column = 0; column < 100; column++) {
        const cellMeta = cellMetaManagerPrototypeProxy.getCellMetaLazy(row, column);
        const prop = CellMetaManagerPrototypeProxy.AVAILABLE_OPTIONS[row % CellMetaManagerPrototypeProxy.AVAILABLE_OPTIONS.length];

        cellMeta[prop] = row;
      }
    }
    next();
  });

  bench('[set] prototype wrapper', function(next) {
    for (let row = 0; row < 100; row++) {
      for (let column = 0; column < 100; column++) {
        const cellMeta = cellMetaManagerPrototypeWrapper.getCellMetaLazy(row, column);
        const prop = CellMetaManagerPrototypeWrapper.AVAILABLE_OPTIONS[row % CellMetaManagerPrototypeWrapper.AVAILABLE_OPTIONS.length];

        cellMeta[prop] = row;
      }
    }
    next();
  });

  // GET
  bench('[get] prototype', function(next) {
    const temp = [];

    for (let row = 0; row < 100; row++) {
      for (let column = 0; column < 100; column++) {
        const cellMeta = cellMetaManagerPrototype.getCellMetaLazy(row, column);
        const prop = CellMetaManagerPrototype.AVAILABLE_OPTIONS[row % CellMetaManagerPrototype.AVAILABLE_OPTIONS.length];

        temp.push(cellMeta[prop]);
      }
    }

    temp.length = 0;
    next();
  });

  bench('[get] prototype map holder', function(next) {
    const temp = [];

    for (let row = 0; row < 100; row++) {
      for (let column = 0; column < 100; column++) {
        const cellMeta = cellMetaManagerPrototypeMapHolder.getCellMetaLazy(row, column);
        const prop = CellMetaManagerPrototypeMapHolder.AVAILABLE_OPTIONS[row % CellMetaManagerPrototypeMapHolder.AVAILABLE_OPTIONS.length];

        temp.push(cellMeta[prop]);
      }
    }

    next();
    temp.length = 0;
  });

  bench('[get] prototype class', function(next) {
    const temp = [];

    for (let row = 0; row < 100; row++) {
      for (let column = 0; column < 100; column++) {
        const cellMeta = cellMetaManagerPrototypeClass.getCellMetaLazy(row, column);
        const prop = CellMetaManagerPrototypeClass.AVAILABLE_OPTIONS[row % CellMetaManagerPrototypeClass.AVAILABLE_OPTIONS.length];

        temp.push(cellMeta[prop]);
      }
    }

    next();
    temp.length = 0;
  });

  bench('[get] prototype new proxy', function(next) {
    const temp = [];

    for (let row = 0; row < 100; row++) {
      for (let column = 0; column < 100; column++) {
        const cellMeta = cellMetaManagerPrototypeProxy.getCellMetaLazy(row, column);
        const prop = CellMetaManagerPrototypeProxy.AVAILABLE_OPTIONS[row % CellMetaManagerPrototypeProxy.AVAILABLE_OPTIONS.length];

        temp.push(cellMeta[prop]);
      }
    }

    next();
    temp.length = 0;
  });

  bench('[get] prototype wrapper', function(next) {
    const temp = [];

    for (let row = 0; row < 100; row++) {
      for (let column = 0; column < 100; column++) {
        const cellMeta = cellMetaManagerPrototypeWrapper.getCellMetaLazy(row, column);
        const prop = CellMetaManagerPrototypeWrapper.AVAILABLE_OPTIONS[row % CellMetaManagerPrototypeWrapper.AVAILABLE_OPTIONS.length];

        temp.push(cellMeta[prop]);
      }
    }

    next();
    temp.length = 0;
  });
});
