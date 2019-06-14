import DefaultSettings from './default-settings';

// const changes = new Map();

let GridSettings = function() {};

GridSettings.prototype.set = function(key, value) {
  this[key] = value;

  // changes.set(`${this.row}x${this.column}`, true);

  return this;
}

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
 * [CellMetaManagerPrototypeDWrapperdescription]
 */
export function CellMetaManagerPrototypeWrapper() {
  const columnMetas = [];
  const cellMetas = [];

  this.createCellMeta = function(row, column) {
    if (!columnMetas[column]) {
      columnMetas[column] = columnFactory(GridSettings, COLUMNS_SETTING_CONFLICTS);
    }
    if (!cellMetas[row]) {
      cellMetas[row] = [];
    }
    if (!cellMetas[row][column]) {
      // const cellMeta = new columnMetas[column]();
      // cellMeta.set = function(key, value) {
      //   this[key] = value;
      //
      //   return this;
      // }

      cellMetas[row][column] = new columnMetas[column]();
    }

    const cellMeta = cellMetas[row][column];

    cellMeta.row = row;
    cellMeta.column = column;

    return cellMeta;
  }

  this.getCellMeta = function(row, column) {
    return cellMetas[row][column];
  }

  this.getCellMetaLazy = function(row, column) {
    return this.createCellMeta(row, column);
  }
}

CellMetaManagerPrototypeWrapper.getInstance = function() {
  return new CellMetaManagerPrototypeWrapper();
};

CellMetaManagerPrototypeWrapper.AVAILABLE_OPTIONS = Object.keys(DefaultSettings.prototype);
