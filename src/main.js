import ARApp from './app'
import UI from './ui';

let ui = new UI();
let app = new ARApp(ui.video, 1024, 768);

ui.onSelectJacket(model => {
    app.jacket(model);
});

ui.onSelectSize(size => {
    app.size(size);
});

app.start();

