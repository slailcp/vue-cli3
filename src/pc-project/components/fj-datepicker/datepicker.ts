import moment from 'moment';

class Datepicker {
    private today = moment().format('YYYY-MM-DD');
    private start = '';
    private end = '';
    private currentMonth = '';
    private activeMonth: string[] = [];
    private type : 'single' | 'double' = 'single';

    setClassname(now: any) {
        let classname = '';
        let tag = '';
        if(moment(now).diff(moment(this.start))<0 || moment(this.end).diff(moment(now))<0){
            classname = 'disabled';
        }else{
            classname += 'enabled';
        }
        
        if(moment(now).diff(moment(moment().format('YYYY-MM-DD')))===0){
            classname += ' today'; 
            tag = '今'; 
        }

        this.activeMonth.forEach((item, index) => {
            if(item && moment(now).diff(moment(item))===0){
                classname += ' current';
                if(this.activeMonth.length === 2){
                    tag = index === 0 ? 's' : 'e';
                }
            }
        })
        
        return {classname, tag};
    }

    getAllDate(curmonth: any) {
        const sd = Number(moment(curmonth).startOf('month').format('x')); // 本月第一天
        const ed = Number(moment(curmonth).endOf('month').format('x')); // 本月最后一天 -- 默认单日历

        let dataObject: any = {};

        dataObject[sd] = {title: moment(curmonth).format('YYYY年MM月'), date: []} // 初始第一个月
        const week = moment(sd).weekday() === 0 ? 7 : moment(sd).weekday(); // 某月的第一天是周几， 0：周末，1周一 。。。 6：周六
        for (let w = 0; w < week; w++) { // 对本月一号之前的周几补全。
            const o = moment(sd).add(-(moment(sd).weekday() - w),'d');
            dataObject[sd].date.push({
                year: o.format('YYYY'), 
                month: o.format('MM'), 
                day: o.format('DD'), 
                week: w,
                classname: 'prev '+ this.setClassname(o).classname,
                tag: this.setClassname(o).tag
            });// 如果当前月份没有存储当前天数用的数组,就创建一个空数组，如果有，就向里面添加一个空对象; (空对象是用来占位置的，用来填充月份前面的空白)
        }

        for (let i = sd; i <= ed;){
            const option = {
                year: moment(i).format('YYYY'),
                month: moment(i).format('MM'),
                day: moment(i).format('DD'),
                week: moment(i).weekday(),
                classname: this.setClassname(i).classname,
                tag: this.setClassname(i).tag
            }
            dataObject[sd].date.push(option);
            i = Number(moment(i).add(1, 'days').format('x')); // 下次赋值
        }
        
        let week1 = moment(ed).weekday(); // 某月的第一天是周几， 0：周末，1周一 。。。 6：周六
        let ww = (dataObject[sd].date.length + (6 - week1))>=42 ? 6 : 13;
        for (let w = week1; w <ww; w++) { // 对本月一号之前的周几补全。
            const o = moment(ed).add(w,'d')
            dataObject[sd].date.push({
                year: o.format('YYYY'), 
                month: o.format('MM'), 
                day: o.format('DD'), 
                week: w,
                classname: 'next '+ this.setClassname(o).classname,
                tag: this.setClassname(o).tag
            });// 如果当前月份没有存储当前天数用的数组,就创建一个空数组，如果有，就向里面添加一个空对象; (空对象是用来占位置的，用来填充月份前面的空白)
        }
        return dataObject;
    }

    init(start: any, end: any, activeMonth: any, currentMonth: any, type: 'single' | 'double') { // 可选择的日期范围 （单月切换）
        if(activeMonth.split('~').length){ // activeMonth被分割成数组
            activeMonth = activeMonth.split('~');
        } 
        
        (activeMonth as []).forEach(item => {
            if(item && !(isNaN(item)&&!isNaN(Date.parse(item)))) {
                activeMonth = [];
            }
        })

        if(start && !(isNaN(start)&&!isNaN(Date.parse(start)))) {
            start = '';
        }

        if(end && !(isNaN(end)&&!isNaN(Date.parse(end)))) {
            end = '';
        }
       
        this.type = type;
        this.start = start;
        this.end = end;
        this.currentMonth = currentMonth || activeMonth[0] || this.today;
        this.activeMonth = activeMonth;

        const nextMoth = moment(this.currentMonth).add(1,'month').format('YYYY-MM-DD')
        let dataObject = {};
        if(this.type === 'double'){
            dataObject = {...this.getAllDate(this.currentMonth),...this.getAllDate(nextMoth)}
        }else{
            dataObject = {...this.getAllDate(this.currentMonth)}
        }
        console.log(dataObject);
        
        return dataObject;
    }
}

export default Datepicker;

