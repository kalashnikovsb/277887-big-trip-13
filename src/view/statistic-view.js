import {getEventsPricesByTypes, geteventsCountsByTypes, getDurationsByTypes} from "../utils/statistic-utils.js";
import {render, remove} from "../utils/render-utils.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from "./smart-view.js";
import {BAR_HEIGHT, TYPES, RenderPosition} from "../const.js";


const renderMoneyChart = (moneyCtx, events) => {
  const eventsPricesByTypes = getEventsPricesByTypes(TYPES, events);

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [...TYPES],
      datasets: [{
        data: [...eventsPricesByTypes],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 14
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 24,
        position: `left`,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 14,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 40,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};


const renderTypeChart = (typesCtx, events) => {
  const eventsCountsByTypes = geteventsCountsByTypes(TYPES, events);

  return new Chart(typesCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [...TYPES],
      datasets: [{
        data: [...eventsCountsByTypes],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 14
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TYPE`,
        fontColor: `#000000`,
        fontSize: 24,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 14,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 40,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};


const renderTimeChart = (timeCtx, events) => {
  const durationsByTypes = getDurationsByTypes(TYPES, events);

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [...TYPES],
      datasets: [{
        data: [...durationsByTypes],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 14
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}D`
        }
      },
      title: {
        display: true,
        text: `TIME-SPEND`,
        fontColor: `#000000`,
        fontSize: 24,
        position: `left`,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 14,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 40,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};


const getStatisticTemplate = () => {
  return `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`;
};


export default class StatisticView extends SmartView {
  constructor(container, events) {
    super();
    this._container = container;
    this._events = events;

    this._moneyChart = null;
    this._typesChart = null;
    this._timeChart = null;

    this._setCharts();
  }


  getTemplate() {
    return getStatisticTemplate(this._events);
  }


  _setCharts() {
    if (this._moneyChart !== null || this._typesChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typesChart = null;
      this._timeChart = null;
    }

    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const typesCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeCtx = this.getElement().querySelector(`.statistics__chart--time`);

    moneyCtx.height = BAR_HEIGHT * 5;
    typesCtx.height = BAR_HEIGHT * 5;
    timeCtx.height = BAR_HEIGHT * 5;

    this._moneyChart = renderMoneyChart(moneyCtx, this._events);
    this._typesChart = renderTypeChart(typesCtx, this._events);
    this._timeChart = renderTimeChart(timeCtx, this._events);
  }


  removeElement() {
    super.removeElement();

    if (this._moneyChart !== null || this._typesChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typesChart = null;
      this._timeChart = null;
    }
  }


  show() {
    if (document.querySelector(`.statistics`)) {
      return;
    }
    this.removeElement();
    this._setCharts();
    render(this._container, this.getElement(), RenderPosition.AFTEREND);
  }


  hide() {
    remove(this);
  }
}
