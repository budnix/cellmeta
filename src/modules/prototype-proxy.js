import DefaultSettings from './default-settings';

let GridSettings = function() {};

extend(GridSettings.prototype, DefaultSettings.prototype); // create grid settings as a copy of default settings
// extend(GridSettings.prototype, userSettings); // overwrite defaults with user settings

function inherit(Child, Parent) {
  Parent.prototype.constructor = Parent;
  Child.prototype = new Parent();
  Child.prototype.constructor = Child;

  return Child;
}

export function extend(target, extension) {
  for (const key in extension) {
    if (Object.prototype.hasOwnProperty.call(extension, key)) {
      target[key] = extension[key];
    }
  }

  return target;
}

function columnFactory(GridSettings, conflictList) {
  function ColumnSettings() {}

  inherit(ColumnSettings, GridSettings);

  // Clear conflict settings
  for (let i = 0, len = conflictList.length; i < len; i++) {
    ColumnSettings.prototype[conflictList[i]] = void 0;
  }

  return ColumnSettings;
}

const COLUMNS_SETTING_CONFLICTS = ['data', 'width', 'language'];

/**
 * [CellMetaManagerPrototypeProxy description]
 */
export function CellMetaManagerPrototypeProxy() {
  const columnMetas = [];
  const cellMetas = [];
  // const changes = new Map();

  this.createCellMeta = function(row, column) {
    if (!columnMetas[column]) {
      columnMetas[column] = columnFactory(GridSettings, COLUMNS_SETTING_CONFLICTS);
    }
    if (!cellMetas[row]) {
      cellMetas[row] = [];
    }
    if (!cellMetas[row][column]) {
      const cellMeta = new columnMetas[column]();

      const handler = {
        set: function(target, prop, value) {
          // changes.set(`${row}x${column}`, true);

          return Reflect.set(target, prop, value);
        },
      };

      cellMetas[row][column] = new Proxy(cellMeta, handler);
    }

    const cellMeta = cellMetas[row][column];

    Reflect.set(cellMeta, 'row', row);
    Reflect.set(cellMeta, 'column', column);

    return cellMeta;
  }

  this.getCellMeta = function(row, column) {
    return cellMetas[row][column];
  }

  this.getCellMetaLazy = function(row, column) {
    return this.createCellMeta(row, column);
  }
}

CellMetaManagerPrototypeProxy.getInstance = function() {
  return new CellMetaManagerPrototypeProxy();
};

CellMetaManagerPrototypeProxy.AVAILABLE_OPTIONS = Object.keys(DefaultSettings.prototype);
