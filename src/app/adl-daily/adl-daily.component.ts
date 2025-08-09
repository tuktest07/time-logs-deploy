import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonContent, IonHeader, IonToolbar, IonList, IonLabel, IonText, IonItem, IonIcon, IonRadio, IonButton, IonFooter, IonGrid, IonRow, IonCol, IonRadioGroup, IonImg, IonModal, ModalController, IonThumbnail, IonButtons, IonMenuButton, IonTitle, IonCard, IonCardContent, IonSelect, IonSelectOption, ToastController, LoadingController, Platform, IonListHeader, IonCardHeader, IonCardTitle, IonFab, IonFabButton, IonInput } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { camera, cameraOutline, locate, navigateCircle } from 'ionicons/icons';

import { fromLonLat } from 'ol/proj';

import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import CircleStyle from 'ol/style/Circle';
import TextStyle from 'ol/style/Text';   // ← สำคัญ
import View from 'ol/View';

import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
interface FileItem {
  id?: number | string;
  name?: string;
  type?: string;
  thumb?: string | ArrayBuffer | undefined;
  file?: File;
  description?: string;
  picture?: string;
  percent?: number;
}
@Component({
  selector: 'app-adl-daily',
  templateUrl: './adl-daily.component.html',
  styleUrls: ['./adl-daily.component.scss'],
  standalone: true,
  imports: [IonInput, IonCardContent,
    IonIcon,
    IonButtons,
    IonTitle,
    IonCardTitle,
    IonListHeader,
    IonFab,
    IonFabButton,
    IonCardHeader,
    IonMenuButton,
    IonList,
    IonCardContent,
    IonCard,
    IonRadioGroup,
    IonList,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonItem,
    IonLabel,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    IonHeader,
    IonToolbar,
    IonContent,
    IonRadio,
    NgFor,
    IonText,
    IonFooter
  ]
})
export class AdlDailyComponent implements OnInit {

  btnDisabled: boolean = false;
  filesUpload: Array<FileItem> = new Array<FileItem>();
  isBrowser: boolean;
  // ✨ Data สำหรับแสดงผลใน UI
  currentDay: string = '';
  currentDate: string = '';
  currentTime: string = '';
  isClockedIn: boolean = false; // สถานะการลงเวลา: true = เข้างานแล้ว, false = ยังไม่เข้า/เลิกงานแล้ว
  photoSrc: string | undefined; // URL ของรูปที่ถ่ายได้
  currentLocation: { lat: number; lng: number; accuracy?: number } | null = null; // ตำแหน่งปัจจุบัน
  locationError: string | null = null; // ข้อผิดพลาดเกี่ยวกับตำแหน่ง

  // ✨ Data สำหรับฟอร์มการลงเวลา
  punchType: string = 'เข้างานปกติ'; // ค่าเริ่มต้นของประเภทการทำงาน
  locationType: string = 'in-office'; // ค่าเริ่มต้นของสถานที่: 'in-office' หรือ 'out-of-office'

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private platform: Platform,
    private _platform: Platform,
    private ngZone: NgZone // ใช้เพื่อบังคับให้ Angular ตรวจจับการเปลี่ยนแปลง UI หากมีการอัปเดตจากภายนอก Angular Zone (เช่น Callbacks ของ Native API)
  ) {
    /**
     * Any icons you want to use in your application
     * can be registered in app.component.ts and then
     * referenced by name anywhere in your application.
     */
    addIcons({ cameraOutline, navigateCircle, locate });
    this.isAndroid = _platform.is('android');
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  onFilesInput(ev: any) {
    const file = ev.target.files[0];
    const name = ev.target.files[0].name;
    const type = ev.target.files[0].type;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {

      // this.compressImage(<string>reader.result, type).then(res => {
      //   fetch(<string>res)
      //     .then(res => res.blob())
      //     .then(blob => {
      //       const file = new File([blob], name, { type: "image/png" });
      //       this.pushPhoto(name, [file]);
      //     })
      // });
    };
  }
  /** Platform */
  isAndroid: boolean;
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      console.log('x')
      setTimeout(() => {
        const osmLayer = new TileLayer({
          source: new XYZ({
            url: `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoib2Zzb2x1dGlvbnMiLCJhIjoiY2xsb2x2MDFrMGViaDNtbXFuMzhqNzh5bSJ9.dAjWBIWa1Z5NYza_DsVKGQ`,
            tileSize: 512,
            maxZoom: 22,
            crossOrigin: 'anonymous'
          })
        });

        new Map({
          target: 'map', // ต้องตรงกับ id ใน HTML 
          controls: [],
          layers: [
            osmLayer,
            // tileLayer,
            // vectorLayer
          ],
          view: new View({
            center: fromLonLat([100.456712, 13.567823]),
            zoom: 15,
          }),
        });
      }, 3000)
    }
    // // ⚡ เริ่มต้นเมื่อโหลดหน้า
    this.updateDateTime();

    // setInterval(() => this.updateDateTime(), 1000); // อัปเดตเวลาทุก 1 วินาที
    // this.checkClockInStatus(); // ตรวจสอบสถานะการลงเวลาจาก Storage
    // this.getCurrentLocation(); // ดึงตำแหน่งปัจจุบันเมื่อหน้าโหลด
  }

  private formatThaiDate(date: Date): string {
    const days = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
    const months = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const yearBE = date.getFullYear() + 543; // ปี พ.ศ.

    return `วัน${dayName} ที่ ${day} ${monthName} ${yearBE}`;
  }
  workType: string = 'branch'; // ค่าเริ่มต้น
  branchName: string = '';

  onWorkTypeChange() {
    if (this.workType !== 'outside') {
      this.branchName = ''; // เคลียร์ถ้าไม่ใช่นอกสาขา
    }
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------  
  getCurrentTime(): string {
    const now = new Date();

    const pad = (num: number) => num.toString().padStart(2, '0');

    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    return `${hours} : ${minutes} : ${seconds}`;
  }
  /** Remove image */
  buttonRemoveMediaFile(position: number) {
    // this.filesUpload.splice(position, 1);
    // this.passForInsert();
  }
  dateTH(date: string): string {
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = {
      year: '2-digit',
      month: 'long',
      day: '2-digit'
    };
    return new Date(date).toLocaleDateString('th', options);
  }
  // --- ✨ Helper Functions: จัดการข้อมูลวันที่และเวลา ---
  updateDateTime() {
    const now = new Date();
    // format วันที่/เวลาเป็นภาษาไทย
    this.currentDay = this.formatThaiDate(now); // เช่น "วันศุกร์"
    // this.currentDate = format(now, 'd MMMM yyyy', { locale: th }); // เช่น "9 สิงหาคม 2568"
    // this.currentTime = format(now, 'HH:mm:ss'); // เช่น "12:52:33"
  }

  // --- ✨ Logic: ตรวจสอบสถานะการลงเวลา ---
  async checkClockInStatus() {
    // ในแอปจริง คุณจะดึงสถานะนี้จาก Backend หรือ Local Storage
    // const status = localStorage.getItem('isClockedIn');
    // this.isClockedIn = status === 'true';
  }

  // --- ✨ Native Features: กล้องและการระบุตำแหน่ง ---

  async getCurrentLocation() {
    // const loading = await this.loadingController.create({
    //   message: 'กำลังค้นหาตำแหน่ง...',
    //   duration: 10000 // ให้เวลา 10 วินาที
    // });
    // await loading.present();

    // try {
    //   // ⚠️ ตรวจสอบสิทธิ์การเข้าถึงตำแหน่งก่อน
    //   const permission = await Geolocation.checkPermissions();
    //   if (permission.location !== 'granted') {
    //     const request = await Geolocation.requestPermissions();
    //     if (request.location !== 'granted') {
    //       this.locationError = 'ไม่ได้รับอนุญาตให้เข้าถึงตำแหน่งที่ตั้ง';
    //       await loading.dismiss();
    //       this.presentToast('ไม่สามารถระบุตำแหน่งได้: โปรดเปิด GPS และอนุญาตให้แอปเข้าถึง', 'danger');
    //       return;
    //     }
    //   }

    //   // 🌐 ดึงตำแหน่งปัจจุบัน
    //   const position = await Geolocation.getCurrentPosition({
    //     enableHighAccuracy: true,
    //     timeout: 10000 // 10 วินาที
    //   });

    //   this.ngZone.run(() => { // บังคับให้ Angular อัปเดต UI
    //     this.currentLocation = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude,
    //       accuracy: position.coords.accuracy
    //     };
    //     this.locationError = null;
    //     console.log('Location:', this.currentLocation);
    //   });

    // } catch (error: any) {
    //   this.ngZone.run(() => {
    //     this.locationError = `ข้อผิดพลาดในการระบุตำแหน่ง: ${error.message}`;
    //     this.presentToast(`ไม่สามารถระบุตำแหน่งได้: ${error.message}`, 'danger');
    //     console.error('Error getting location', error);
    //   });
    // } finally {
    //   await loading.dismiss();
    // }
  }

  async takePhoto() {
    // try {
    //   // 📸 ถ่ายรูป
    //   const image = await Camera.getPhoto({
    //     quality: 90,
    //     allowEditing: false, // ไม่อนุญาตให้แก้ไขรูป
    //     resultType: CameraResultType.Uri, // ส่งคืนเป็น File URI (path)
    //     source: CameraSource.Camera // ใช้กล้องเท่านั้น
    //   });

    //   if (image.webPath) {
    //     this.ngZone.run(() => { // บังคับให้ Angular อัปเดต UI
    //       this.photoSrc = image.webPath;
    //       this.presentToast('ถ่ายรูปสำเร็จ', 'success');
    //     });
    //   }

    // } catch (error) {
    //   this.presentToast('เกิดข้อผิดพลาดในการถ่ายรูป', 'danger');
    //   console.error('Error taking photo:', error);
    // }
  }

  // --- ✨ Main Action: ปุ่มลงเวลา ---
  async togglePunch() {
    // ⚠️ ตรวจสอบความถูกต้องของข้อมูลก่อนส่ง
    if (this.locationType === 'out-of-office' && !this.photoSrc) {
      this.presentAlert('แจ้งเตือน', 'กรุณาถ่ายรูปเพื่อยืนยันการลงเวลานอกสถานที่');
      return;
    }

    if (!this.currentLocation) {
      this.presentAlert('แจ้งเตือน', 'ไม่สามารถระบุตำแหน่งได้ กรุณาลองอัปเดตตำแหน่งอีกครั้ง');
      this.getCurrentLocation(); // ลองดึงตำแหน่งใหม่
      return;
    }

    const loading = await this.loadingController.create({
      message: this.isClockedIn ? 'กำลังบันทึกการเลิกงาน...' : 'กำลังบันทึกการเข้างาน...'
    });
    await loading.present();

    try {
      // 🚀 จำลองการส่งข้อมูลไปยัง Backend
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulating API call

      // 💡 Data ที่จะส่งไป Backend
      const punchData = {
        type: this.punchType,
        locationType: this.locationType,
        latitude: this.currentLocation?.lat,
        longitude: this.currentLocation?.lng,
        accuracy: this.currentLocation?.accuracy,
        timestamp: new Date().toISOString(),
        photoUrl: this.photoSrc || null // ส่ง URL รูปภาพถ้ามี
      };

      console.log('Sending data to backend:', punchData);
      // ในแอปจริง คุณจะใช้ HttpClient เพื่อส่งข้อมูลนี้ไปยัง API ของคุณ
      // this.http.post('/api/punch', punchData).subscribe(...)

      this.isClockedIn = !this.isClockedIn; // สลับสถานะ
      localStorage.setItem('isClockedIn', this.isClockedIn.toString()); // บันทึกสถานะชั่วคราว

      await loading.dismiss();
      this.presentToast(this.isClockedIn ? 'ลงเวลาเข้างานสำเร็จ!' : 'ลงเวลาเลิกงานสำเร็จ!', 'success');

      // 🧹 รีเซ็ตข้อมูลสำหรับรอบถัดไป (ถ้าจำเป็น)
      if (!this.isClockedIn) { // หากเลิกงานแล้ว ให้รีเซ็ตบางฟิลด์
        this.photoSrc = undefined;
        this.punchType = 'เข้างานปกติ'; // ตั้งค่าเริ่มต้นใหม่
      }

    } catch (error) {
      await loading.dismiss();
      this.presentToast('เกิดข้อผิดพลาดในการบันทึกข้อมูล', 'danger');
      console.error('Punch error:', error);
    }
  }

  // --- ✨ UI Utility Functions ---
  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['ตกลง']
    });
    await alert.present();
  }
}