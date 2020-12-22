<template>
  <div></div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
export default {
  name: 'BaseChart',
  inheritAttrs: false,
  props: {
    chart: Function,
  },
  mounted() {
    const { data, config } = this.getChartConfig();
    this.config = cloneDeep(config);
    const normalizedData = data || [];
    this.data = normalizedData;
    // eslint-disable-next-line new-cap
    this.plot = new this.chart(this.$el, {
      data: normalizedData,
      ...config,
    });
    this.plot.render();
    this.unwatch = this.$watch('$attrs', function (newVal, oldVal) {
     this.updateChart()
    });
  },
  beforeDestroy() {
    this.unwatch && this.unwatch();
  },
  methods: {
    updateChart() {
      const { data, config } = this.getChartConfig();
      const normalizedData = data || [];
      if (this.plot) {
        // 配置不同 or 数据为空
        if (!isEqual(config, this.config) || !this.data.lenght) {
          this.config = cloneDeep(config);
          this.plot.update({
            data: normalizedData,
            ...config,
          });
          this.plot.render();
        } else {
          this.plot.changeData(normalizedData);
        }
        this.data = normalizedData;
      }
    },
    getChartConfig() {
      const { chart, chartRef, ...restProps } = this.$attrs;
      const { data, ...config } = restProps;
      return {
        data,
        config,
      };
    },
  },
};
</script>
