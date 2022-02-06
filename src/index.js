const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// Database
require('./database');

// Settings
app.set('port', 3000);

// set images
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/imgs'),
    filename: (req, filename, cb) => {
        cb(null, new Date().getMilliseconds() + path.extname(filename.originalname));
    }
});

//midelwares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(multer({storage}).single('image'));

// rutas
app.use('/users', require('./rutas/userRoutes'));
app.use('/publications', require('./rutas/publicationsRoutes'));
app.use('/follows', require('./rutas/follows'));
app.use('/messagess', require('./rutas/messagess'));

// archivos estaticos
app.use('/', express.static(path.resolve('src/public/imgs')));

app.listen(app.get('port'), () => {
    console.log('node en el puerto: ' + app.get('port'));
    console.log(__dirname)
    console.log('PathResolve: ' + path.resolve())
});

/* 
                <div class="card">
                <h6 class="text-center card-text text-dark">¿ QUE ESTAS PENSANDO ?</h6>
            <div class="card-body">
                <form #publicationForm="ngForm" (ngSubmit)="makePublication(publicationForm)">
                    <div class="form-group my-3">
                        <input type="text" name="text" #text="ngModel" placeholder="Escribe una pubicacion"
                        class="form-control" [(ngModel)]="publication.text">
                    </div>
                    <div class="form-group my-3">
                        <label for="formFileSm" class="form-label">Elige una imagen</label>
                        <input class="form-control form-control-sm" id="formFileSm" type="file"
                        (change)="imgPublication($event)">
                      </div>
                    <div class="d-grid my-3">
                        <button class="btn btn-primary">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
        
        <div class="mensajeria p-2 mb-3">
            <router-outlet></router-outlet>
        </div> 

        <div class="buttonsMsgs bg-info">
            <ul class="nav nav-pills nav-justified Buttonss">
                <li class="nav-item"> 
                  <a class="nav-link" [routerLink]="['/inicio/recibidos']" [routerLinkActive]="['active']" >Recibidos</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" [routerLink]="['/inicio/enviar']" [routerLinkActive]="['active']">Enviar</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" [routerLink]="['/inicio/enviados']" [routerLinkActive]="['active']">Enviados</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link">Mensajes</a>
                </li>
              </ul>
        </div> 
*/