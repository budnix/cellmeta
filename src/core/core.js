import benchmark from 'benchmark';

function getHz (bench) {
  return 1 / (bench.stats.mean + bench.stats.moe);
}

function formatNumber(number) {
  number = String(number).split('.');
  return number[0].replace(/(?=(?:\d{3})+$)(?!\b)/g, ',') +
    (number[1] ? '.' + number[1] : '');
}

const RESULTS_WRAPPER = '#results';

export function createSuite(suiteName, specs) {
  const tmpl = ({ suiteName }) => `<table class="mui-table" >
    <thead>
      <tr>
        <th colspan="3">${suiteName}</th>
      </tr>
      <tr>
        <th class="small-header">Test name</th>
        <th class="small-header">Ops/sec</th>
        <th class="small-header">Summary</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>`;

  const table = new DOMParser().parseFromString(tmpl({ suiteName }), 'text/html').querySelector('table');
  const tableBody = table.querySelector('tbody');

  document.querySelector(RESULTS_WRAPPER).appendChild(table);

  return new Promise(function(resolve, reject) {
    const benchmarks = [];
    const suite = new Benchmark.Suite();

    specs.forEach((spec) => {
      suite.add(spec);
    });

    suite.on('cycle', function(event) {
       const row = tableBody.insertRow();
       const bench = event.target;
       const size = bench.stats.sample.length;
       const hz = getHz(bench);
       const opsSec = formatNumber(hz.toFixed(hz < 100 ? 2 : 0)) + ' ops/sec \xb1' + bench.stats.rme.toFixed(2) +
                      '% (' + size + ' run' + (size == 1 ? '' : 's') + ' sampled)';

       benchmarks.push(bench);

       row.insertCell().textContent = bench.name;
       row.insertCell().textContent = opsSec;
       row.insertCell().innerHTML = '<i>[calculating]</i>';
    })
    .on('complete', function(event) {
      const trs = tableBody.querySelectorAll('tr');
      const fastest = this.filter('fastest');
      const slowest = this.filter('slowest');

      benchmarks.forEach((bench, index) => {
         const fastestHz = getHz(fastest[0]);
         const hz = getHz(bench);
         const percent = (1 - (hz / fastestHz)) * 100;
         const tr = trs[index];
         const td = tr.lastChild;
         let text = 'fastest';

         if (fastest.indexOf(bench) > -1) {
           tr.classList.add(text);
         } else {
           text = Number.isFinite(hz) ? formatNumber(percent < 1 ? percent.toFixed(2) : Math.round(percent)) + '% slower' : '';

           if (slowest.indexOf(bench) > -1) {
             tr.classList.add('slowest');
           }
         }

         td.innerHTML = text;

         resolve();
      })
    })
    .on('error', function(event) {
      reject(event.target.error);
    })
    .run({ 'async': true });
  });
}
