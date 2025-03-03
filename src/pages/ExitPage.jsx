
import { Pie } from '@ant-design/plots';

const ExitPage = () => {

    const config = {
        data: [
          { type: '分类一', value: 27 },
          { type: '分类二', value: 25 },
          { type: '分类三', value: 18 },
          { type: '分类四', value: 15 },
          { type: '分类五', value: 10 },
          { type: '其他', value: 5 },
        ],
        angleField: 'value',
        colorField: 'type',
        paddingRight: 80,
        innerRadius: 0.6,
        label: {
          text: 'value',
          style: {
            fontWeight: 'bold',
          },
        },
        legend: {
          color: {
            title: false,
            position: 'right',
            rowPadding: 5,
          },
        },
        annotations: [
          {
            type: 'text',
            style: {
              text: 'AntV\nCharts',
              x: '50%',
              y: '50%',
              textAlign: 'center',
              fontSize: 40,
              fontStyle: 'bold',
            },
          },
        ],
      };
  return <Pie {...config} />;
};

export default ExitPage