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
 * [CellMetaManagerPrototypeMapHolder description]
 */
export function CellMetaManagerPrototypeMapHolder() {
  const columnMetas = new Map();
  const cellMetas = new Map();


  this.getCellMetas = function() {
    return cellMetas;
  }

  this.createCellMeta = function(row, column) {
    if (!columnMetas.has(column)) {
      columnMetas.set(column, columnFactory(GridSettings, COLUMNS_SETTING_CONFLICTS));
    }
    // const id = `${row}x${column}`;

    if (!cellMetas.has(row)) {
      cellMetas.set(row, new Map());
    }
    if (!cellMetas.get(row).has(column)) {
      const ColumnClass = columnMetas.get(column);

      cellMetas.get(row).set(column, new ColumnClass());
    }

    const cellMeta = cellMetas.get(row).get(column);

    cellMeta.row = row;
    cellMeta.column = column;

    return cellMeta;
  }

  this.getCellMeta = function(row, column) {
    return cellMetas.get(row).get(column);
  }

  this.getCellMetaLazy = function(row, column) {
    return this.createCellMeta(row, column);
  }
}

CellMetaManagerPrototypeMapHolder.getInstance = function() {
  return new CellMetaManagerPrototypeMapHolder();
};

CellMetaManagerPrototypeMapHolder.AVAILABLE_OPTIONS = Object.keys(DefaultSettings.prototype);
