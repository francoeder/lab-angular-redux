export class SchedulingModel {
    title: string;
    color: any = colors.yellow;
    startDate: string;
    endDate: string;
    get start(): Date { return new Date(this.startDate) }
    get end(): Date { return new Date(this.startDate) }
}

export const colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };