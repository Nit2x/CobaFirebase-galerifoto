import { fileFoto } from './../tab4/tab4.page';
import { FotoService, Photo } from './../services/foto.service';
import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public fotoService:FotoService,
    public afStorage : AngularFireStorage,
    public toastCtrl : ToastController
    ) {}

  async ngOnInit() {
    await this.fotoService.loadFoto();
  }

  TambahFoto() {
    this.fotoService.tambahFoto();
  }

  fototitle : string;
  fotoUpload : Photo;

  getNama(judulFoto : Photo) {
    this.fotoUpload = judulFoto;
    this.fototitle = judulFoto.filePath;
  }

  uploadData() {
    const imgfilepath = `filestorage/${this.fotoUpload.filePath}`;
    this.afStorage.upload(imgfilepath, this.fotoUpload.dataImage).then(()=> {
      console.log(this.fotoUpload);
      this.showToast();
    });
  }

  async showToast() {
    await this.toastCtrl.create({
      message: 'Upload Selesai',
      duration : 2000,
      position : 'middle'
    }).then(res => res.present());
  }

}
