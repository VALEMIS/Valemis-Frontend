import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Import AdminLTE CSS
import './assets/css/adminlte.css'

// Import OverlayScrollbars CSS
import 'overlayscrollbars/overlayscrollbars.css'

const app = createApp(App)

app.use(router)
app.mount('#app')
