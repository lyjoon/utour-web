import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import VueMoment from 'vue-moment';
import moment from "moment";

moment.locale("ko");

Vue.use(Vuetify);
Vue.use(VueMoment, { moment });


Vue.filter('myDate', function(string){
    console.log('myDate.string', string);
    if(string) {
        let res = moment(String(string)).format('yyyy.MM.DD')
        return res;
    }
})

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#3b3939',
                secondary: '#ff7f00',
                identity: '#ff7f00',
                error: '#b71c1c',
            },
        },
    },
    icons: {
        iconfont: 'mdiSvg'
    }
});
