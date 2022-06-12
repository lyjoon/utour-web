import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import VueMoment from 'vue-moment';
import moment from "moment";

import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor-only.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css';
import {colors} from "vuetify/lib";
//import { mdiTempleBuddhist } from '@mdi/js';

moment.locale("ko");

Vue.use(Vuetify);
Vue.use(VueMoment, { moment });
Vue.filter('myDate', function(string){
    if(string) {
        let res = moment(String(string)).format('yyyy.MM.DD')
        return res;
    }
})

export default new Vuetify({
    theme: {
        dark: false,
        themes: {
            light: {
                primary: '#3b3939',
                primary1: colors.blue.darken1,
                grey1: colors.grey.darken1,
                grey2: colors.grey.darken2,
                secondary: '#ff7f00',
                identity: '#470d6c',
                error: '#b71c1c',
                default_background: '#fafbfd'
            },
        },
    },
    icons: {
        iconfont: 'mdiSvg'
    }
});
