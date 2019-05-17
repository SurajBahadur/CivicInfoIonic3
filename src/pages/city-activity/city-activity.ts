import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, MediaFile,CaptureError,CaptureVideoOptions  } from '@ionic-native/media-capture';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { Media, MediaObject } from '@ionic-native/media';
const MEDIA_FILES_KEY = 'mediaFiles';

@IonicPage()
@Component({
  selector: 'page-city-activity',
  templateUrl: 'city-activity.html',
})
export class CityActivityPage {

  imagelist:Array<any>;
  categoryList:Array<any>;
  
  base64Image: string;
  photos:Array<any>

  private data: MediaFile[];
  private display: any;
  private fileToUpload: Blob;

  mediaFiles = [];
  @ViewChild('myvideo') myVideo: any;

  constructor(public navCtrl: NavController,
    private imagePicker: ImagePicker,
    private camera: Camera,
    private filePath: FilePath,
    private file: File,
    private media: Media,
    private storage: Storage,
    private videoPlayer: StreamingMedia,
    private mediaCapture: MediaCapture,
    public alertCtrl:AlertController,
    public navParams: NavParams) {
    
    this.categoryList=[
      {id:'1',name:'Cleaning'},
      {id:'2',name:'Security'},
      {id:'3',name:'Road'},
      {id:'4',name:'Acident'},
      {id:'5',name:'Eve Teasing'},
      {id:'6',name:'Corruption'}
    ]

    this.imagelist=[
      'assets/imgs/1.png',
      'assets/imgs/2.png',
      'assets/imgs/3.png',
      'assets/imgs/1.png',
      'assets/imgs/2.png',
      'assets/imgs/3.png'
    ]

    this.imagelist=[];
  }

  ionViewDidLoad() {

  }

  /* Function to take image from camera */
	takephoto(){
    const options: CameraOptions = {
     quality: 40,
     targetHeight:1280,
     targetWidth:1280,
     destinationType: this.camera.DestinationType.DATA_URL,
     sourceType: this.camera.PictureSourceType.CAMERA
    }

   this.camera.getPicture(options).then((imageData) => {
       this.base64Image = "data:image/jpeg;base64," + imageData;
       this.imagelist.push(this.base64Image);
       this.imagelist.reverse();
       this.photos.push(imageData);    
   });
   
 }

 captureVideo(){
    this.mediaCapture.captureVideo({ limit: 1 }).then( 
      (data: MediaFile[]) => {
        this.data = data;
        console.log(data[0]);
    }, (err: CaptureError) => {
      console.log(err);
    });
  
  }

  play(myFile) {
    if (myFile.name.indexOf('.wav') > -1) {
      const audioFile: MediaObject = this.media.create(myFile.localURL);
      audioFile.play();
    } else {
      let path = this.file.dataDirectory + myFile.name;
      let url = path.replace(/^file:\/\//, '');
      let video = this.myVideo.nativeElement;
      video.src = url;
      video.play();
    }
  }


  convertToBlob() {
    let fileURL = this.data[0].fullPath;
    let fileName = this.data[0].name;

    fetch(this.data[0].fullPath).then(

      (res) => {
        res.blob().then(

          (value) => {
            this.fileToUpload = value;
          }

        )
      }

    );
  }

  showVideo() {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape'
    };
    this.videoPlayer.playVideo('file://' + this.data[0].fullPath, options);
  }

  captureVideoo() {
    let options: CaptureVideoOptions = {
      limit: 1,
      duration: 30
    }
    this.mediaCapture.captureVideo(options).then((res: MediaFile[]) => {
      let capturedFile = res[0];
      let fileName = capturedFile.name;
      let dir = capturedFile['localURL'].split('/');
      dir.pop();
      let fromDirectory = dir.join('/');      
      var toDirectory = this.file.dataDirectory;
      
      this.file.copyFile(fromDirectory , fileName , toDirectory , fileName).then((res) => {
        this.storeMediaFiles([{name: fileName, size: capturedFile.size}]);
      },err => {
        console.log('err: ', err);
      });
          },
    (err: CaptureError) => console.error(err));
  }
 

  storeMediaFiles(files) {
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      if (res) {
        let arr = JSON.parse(res);
        arr = arr.concat(files);
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
      } else {
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files))
      }
      this.mediaFiles = this.mediaFiles.concat(files);
    })
  }



  uploadVideo() {
    // this.convertToBlob();

    // let Ref = firebase.storage().ref('test/test1.mp4');
    // let task = Ref.put(this.fileToUpload);

    // task.on(firebase.storage.TaskEvent.STATE_CHANGED, 
    
    //   (snapshot:firebase.storage.UploadTaskSnapshot) => {
    //     this.display = 'Uploading: ' + ((snapshot.bytesTransferred/snapshot.totalBytes)*100).toFixed(2);
    //   },

    //   (err) => {
    //     alert(err);
    //   },

    //   () => {
    //     alert('Uploaded');
    //   }
    
    // );
  }

 
  	/* Method to delete image */
	deleteImage(index){
		
      let confirm = this.alertCtrl.create({
      title: "Sure you want to delete this photo?",
      message: "",
      buttons: [
        {
          text: "No",
          handler: () => {
          }
        },
        {
          text: "Yes",
          handler: () => {
            this.imagelist.splice(index,1);
            this.photos.splice(index,1);
          }
        }
      ]
    });
    confirm.present();
  }


 /* function to get image from gallery using camera picker */
 getImageFromGalleryUsingCamera(){
  const options: CameraOptions = {
   quality: 40,
   targetHeight:1280,
   targetWidth:1280,
   destinationType: this.camera.DestinationType.DATA_URL,
   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
 }

 this.camera.getPicture(options).then((imageData) => {
     this.base64Image = "data:image/jpeg;base64," + imageData;
     this.imagelist.push(this.base64Image);
     this.imagelist.reverse();
     this.photos.push(imageData);
 });
   
}

}
