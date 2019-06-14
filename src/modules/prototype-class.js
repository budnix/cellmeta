import DefaultSettings from './default-settings';

// class GridSettings extends DefaultSettings {};

// extend(GridSettings.prototype, DefaultSettings.prototype); // create grid settings as a copy of default settings
// extend(GridSettings.prototype, userSettings); // overwrite defaults with user settings

function columnFactory(Settings) {
  class ColumnSettings extends Settings {};

  return ColumnSettings;
}

/**
 * [CellMetaManagerPrototype description]
 */
export function CellMetaManagerPrototypeClass() {
  const columnMetas = [];
  const cellMetas = [];


  this.getCellMetas = function() {
    return cellMetas;
  }

  this.createCellMeta = function(row, column) {
    if (!columnMetas[column]) {
      columnMetas[column] = columnFactory(DefaultSettings);
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

CellMetaManagerPrototypeClass.getInstance = function() {
  return new CellMetaManagerPrototypeClass();
};

CellMetaManagerPrototypeClass.AVAILABLE_OPTIONS = Object.keys(DefaultSettings.prototype);
