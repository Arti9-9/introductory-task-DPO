import React from 'react';
import Heatmap from 'react-calendar-heatmap';

import { Container } from './style';
import { CalendarModel } from "../../models/Models";

type HeatmapValue = { date: Date; count: number };

interface Props {
  calendar: CalendarModel;
}

const CalendarWidget: React.FC<Props> = ({calendar}) => {
  return (
    <Container>
      <div className="wrapper">
        <Heatmap
          startDate={calendar.contributionDays[0].date}
          endDate={calendar.contributionDays[calendar.contributionDays.length - 1].date}
          values={generateHeatmapValues(calendar)}
          gutterSize={1.5}
          classForValue={(item: HeatmapValue) => {
            let clampedCount = 0;
            if (item !== null) {
              clampedCount = Math.max(item.count, 0);
              clampedCount = Math.min(item.count, 4);
            }
            return `scale-${clampedCount}`;
          }}
          tooltipDataAttrs={(value : HeatmapValue) => {
            if (value.count == 0) {
              return {'data-tooltip' : `${value.date.toISOString().slice(0, 10)} не было событий`};
            }
            return {'data-tooltip': `${value.date.toISOString().slice(0, 10)} было ${value.count} событий`};
          }}
        />
      </div>
    </Container>
  );
};

const generateHeatmapValues = (calendar: CalendarModel) => {
  const values: HeatmapValue[] = [];

  calendar.contributionDays.forEach((element: any) => {
    values.push({date: new Date(element.date), count: element.contributionCount});
  });

  return values;
};

export default CalendarWidget;
