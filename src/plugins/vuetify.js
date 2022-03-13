import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import VueMoment from 'vue-moment';
import moment from "moment";

/* toast-ui */
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor-only.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css';


moment.locale("ko");

Vue.use(Vuetify);
Vue.use(VueMoment, { moment });


Vue.filter('myDate', function(string){
    console.log('myDate.string', string);
    if(string) {
        let res = moment(String(string)).format('yyyy-MM-DD')
        console.log('myDate.res', res);
        return res;
    }
})

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#000000',
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
