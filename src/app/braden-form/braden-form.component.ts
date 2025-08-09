import { isPlatformBrowser, NgForOf, NgIf } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonHeader, IonLabel, IonTitle, IonToolbar, IonItem, IonButton, IonList, IonContent, IonItemDivider, IonRadio, IonText, IonRadioGroup, AlertController, IonFooter, IonGrid, IonCol, IonRow, IonIcon, IonImg, IonModal, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, ModalController, LoadingController, IonFabButton } from '@ionic/angular/standalone';
import { closeOutline, informationCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-braden-form',
  standalone: true,
  imports: [IonFabButton,
    IonButtons,
    IonModal,
    IonImg,
    IonIcon,
    IonRow,
    IonCol,
    IonGrid,
    IonFooter,
    IonRadioGroup,
    IonList,
    IonButton,
    IonItem,
    IonLabel,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonItemDivider,
    IonRadio,
    IonText,
    IonModal,
    IonCardContent
  ],
  templateUrl: './braden-form.component.html',
  styleUrl: './braden-form.component.scss'
})
export class BradenFormComponent {
  @ViewChild(IonModal) modal!: IonModal;

  bradenForm: FormGroup;
  isBrowser: boolean;
  isShowRequire: boolean = false;

  totalScore: number | null = null;
  riskLevel: string = '';
  riskColor: string = '';

  bradenSectionsItems = [
    {
      controlName: 'sensory',
      title: 'การรับความรู้สึก',
      description: 'ความสามารถในการตอบสนอง',
      score: null,
      options: [
        {
          label: 'ไม่ตอบสนองต่อความเจ็บปวด',
          value: 1,
          description: 'ไม่ตอบสนองต่อความเจ็บปวด ไม่รู้สึกตัว หรือได้รับยาระงับปวด หรือสามารถในการรับความรู้สึกเจ็บปวดทั้งตัวถูกจำกัด'
        },
        {
          label: 'ตอบสนองต่อความเจ็บปวดแต่สื่อสารเป็นคำพูดไม่ได้',
          value: 2,
          description: 'ตอบสนองต่อความเจ็บปวดแต่สื่อสารไม่ได้, กระสับกระส่าย, ร้องคราง หรือประสาทรับความรู้สึกบกพร่อง ทำให้ความรู้สึกเจ็บปวด หรือไม่สุขสบายถูกจำกัด มากกว่า 2 ส่วนของร่างกาย'
        },
        {
          label: 'ตอบสนองต่อความเจ็บปวดด้วยการสื่อสารเป็นคำพูดได้บางครั้ง',
          value: 3,
          description: 'บอกได้เมื่อถาม แต่หลับเป็นส่วนใหญ่ หรือสูญเสียประสาทรับความรู้สึกบางส่วน ทำให้ความรู้สึกเจ็บปวด หรือไม่สุขสบายถูกกัด 1 หรือ 2 ส่วนของร่างกาย'
        },
        {
          label: 'ตอบสนองต่อความเจ็บปวดได้',
          value: 4,
          description: 'ตอบสนองปกติ ระดับความรู้สึกตัวปกติ ไม่สู๘เสียประสาทรับความรู้สึก สามารถบอกความรู้สึกเจ็บปวด หรือไม่สุขสบายได้'
        }
      ]
    },
    {
      controlName: 'moisture',
      title: 'ความชื้นของผิวหนัง',
      description: 'ระดับความเปียกชื้นของผิวหนัง',
      score: null,
      options: [
        {
          label: 'ผิวหนังเปียกชื้นตลอดเวลา',
          value: 1,
          description: 'ผิวหนังเปียกชื้นตลอดเวลาจากเหงื่อ, ปัสสาวะ, อุจจาระหริอสารคัดหลั่ง พบทุกครั้งเมื่อมีการเคลื่อนไหว หรือพลิกตัว'
        },
        {
          label: 'ผิวหนังค่อนข้างเปียกชื้น',
          value: 2,
          description: 'ผิวหนังเปียกขึ้นบ่อยๆ จากเหงื่อ, ปัสสาวะ, อุจจาระ หรือสารคัดหลั่ง ต้องเปลี่ยนผ้าปู หรือผ้าขวางอย่างน้อยเวรละครั้ง'
        },
        {
          label: 'ผิวหนังเปียกชื้นบางครั้ง',
          value: 3,
          description: 'ผิวหนังเปียกชื้นบางครั้งบางคราว ต้องเปลี่ยนผ้าปูหรือผ้าขวางเพิ่มขึ้นอีกประมาณวันละครั้ง'
        },
        {
          label: 'ผิวหนังไม่เปียกชื้น',
          value: 4,
          description: 'ผิวหนังปกติ สามารถกลั้นปัสสาวะ อุจจาระได้ และบอกได้ทันเปลี่ยนผ้าปู หรือผ้าขวางตามปกติ'
        }
      ]
    },
    {
      controlName: 'activity',
      title: 'ความสามารถในการทำกิจกรรม',
      description: 'ระดับการเคลื่อนไหวของร่างกาย',
      score: null,
      options: [
        {
          label: 'นอนอยู่บนเตียงตลอดเวลา',
          value: 1,
          description: 'นอนอยู่กับเตียงตลอด'
        },
        {
          label: 'ถูกจำกัดอยู่บนเก้าอี้',
          value: 2,
          description: 'ไม่สามารถทรงตัวยืนได้ ต้องใช้รถเข็นนั่ง หรือเปลนอน'
        },
        {
          label: 'เดินได้เองบางครั้ง',
          value: 3,
          description: 'เดินได้ในระยะใกล้ๆ ต้องมีคนช่วย ส่วนใหญ่อยู่บนเตียง หรือรถเข็นนั่ง'
        },
        {
          label: 'เดินได้เอง',
          value: 4,
          description: 'ลุกเดินด้วยตนเองได้'
        }
      ]
    },
    {
      controlName: 'mobility',
      title: 'ความสามารถในการเคลื่อนไหวร่างกาย',
      score: null,
      description: 'ความสามารถในการเปลี่ยนท่า และควบคุมท่าทางของร่างกาย',
      options: [
        {
          label: 'เคลื่อนไหวไม่ได้',
          value: 1,
          description: 'ไม่สามารถเคลื่อนไหวร่างกาย หรือเปลี่ยนท่าได้เองเลย'
        },
        {
          label: 'เคลื่อนไหวร่างกายได้เล็กน้อยและบางครั้ง',
          value: 2,
          description: 'เคลื่อนไหวร่างกายได้เล็กน้อย นานๆ ครั้ง แต่เปลี่ยนท่าเองไม่ได้'
        },
        {
          label: 'เคลื่อนไหวร่างกายได้เล็กน้อยแต่บ่อยครั้ง',
          value: 3,
          description: 'เคลื่อนไหวร่างกายได้บ่อยขึ้น แต่ยังต้องการความช่วยเหลือเล็กน้อยในการเปลี่ยนท่า'
        },
        {
          label: 'ไม่ถูกจำเคลื่อนไหวร่างกาย และเปลี่ยนท่าได้เอง',
          value: 4,
          description: 'เคลื่อนไหวร่างกาย และเปลี่ยนท่าได้ดี ไม่ต้องการความช่วยเหลือ'
        }
      ]
    },
    {
      controlName: 'nutrition',
      title: 'ภาวะโภชนาการ',
      score: null,
      description: 'รูปแบบการรับประทานอาหาร',
      options: [
        {
          label: 'ทุพโภชนาการ',
          value: 1,
          description: 'รับประทานอาหารน้อยกว่า 1/3 ของที่จัดให้ ได้รับโปรตีน <2 ส่วนต่อวัน หรือดื่มน้ำน้อยมาก หรือ NPO หรือได้รับอาหารเหลวใส หรือให้ I.V. มากกว่า 5 วัน'
        },
        {
          label: 'ได้รับอาหารไม่เพียงพอ',
          value: 2,
          description: 'รับประทานอาหารได้น้อยกว่าครึ่งของที่จัดให้ ได้รับโปรตีน 3 ส่วนต่อวัน หรือได้รับอาหารทดแทน หรือได้รับอาหารทางสายยางน้อยกว่าที่ควรจะได้รับ'
        },
        {
          label: 'ได้รับอาหารเพียงพอ',
          value: 3,
          description: 'รับประทานอาหารได้มากกว่าครึ่งของที่จัดให้ ได้รับโปรตีน 4 ส่วนต่อวัน หรือได้รับอาหารทดแทน หรือได้รับอาหารทางสายยาง หรือ TPN ตามที่ควรจะได้รับ'
        },
        {
          label: 'ได้รับอาหารได้ดีมาก',
          value: 4,
          description: 'รับประทานอาหารได้หมดทุกมื้อ ได้รับโปรตีน 4 ส่วนหรือมากกว่า 4 ส่วนต่อวัน และไม่ต้องงการอาหารทดแทน'
        }
      ]
    },
    {
      controlName: 'friction',
      title: 'แรงเสียดสีแรงเสียดทาน',
      score: null,
      description: '',
      options: [
        {
          label: 'เลื่อนไหลไปจากท่าเดิมขณะนอนหรือนั่ง',
          value: 1,
          description: 'ต้องการความช่วยเหลือปานกลาง-มากในการยก หรือเลื่อนตัว เมื่ออยู่ในท่านั่งศีรษะสูงมักมีการเลื่อนไถลลง หรือมีอาการเกร็ง หรือข้อติด'
        },
        {
          label: 'ทรงตัวท่าทางของร่างกายขณะนอนหรือนั่ง',
          value: 2,
          description: 'ต้องการความช่วยเหลือเล็กน้อยในการยก หรือเลื่อนตัว ช่วยทรงตัวได้ดีในท่านั่ง แต่อาจเลื่อนไถลลงบ้างบางครั้ง'
        },
        {
          label: 'ทรงตัวได้ดีขณะนอนหรือนั่ง   ',
          value: 3,
          description: 'เคลื่อนไหว ยก หรือเลื่อนตัวในเตียง หรือเก้าอี้ได้ดี สามารถจัดทำ และทรงตัวได้ดีในเตียง หรือเก้าอี้ โดยไม่ต้องการความช่วยเหลือ'
        }
      ]
    }
  ];

  bradenSections = [
    {
      key: 'sensory',
      title: 'การรับความรู้สึก - ความสามารถในการตอบสนอง',
      score: null,
      options: [
        { label: '1. ไม่ตอบสนองต่อความเจ็บปวด', value: 1 },
        { label: '2. ตอบสนองต่อความเจ็บปวด แต่ช้าหรือจำกัด', value: 2 },
        { label: '3. ตอบสนองปกติ แต่มีข้อจำกัด', value: 3 },
        { label: '4. ตอบสนองปกติ', value: 4 }
      ]
    },
    {
      key: 'moisture',
      title: 'ความชื้น',
      score: null,
      options: [
        { label: '1. เปียกชื้นตลอดเวลา', value: 1 },
        { label: '2. เปียกชื้นบ่อย', value: 2 },
        { label: '3. เปียกชื้นเป็นครั้งคราว', value: 3 },
        { label: '4. เปียกชื้นเป็นครั้งคราวหรือแห้ง', value: 4 }
      ]
    },
    // เพิ่มหัวข้ออื่นๆ เช่น การเคลื่อนไหว, โภชนาการ, แรงเสียดทาน ฯลฯ
  ];

  currentDay: string = '';
  isModalOpen: boolean = false;
  isModalResultOpen: boolean = false;

  isShowloading: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private alertController: AlertController,
    private _modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {
    /**
     * Any icons you want to use in your application
     * can be registered in app.component.ts and then
     * referenced by name anywhere in your application.
     */
    addIcons({ informationCircle, closeOutline });

    this.isBrowser = isPlatformBrowser(this.platformId);
    this.currentDay = this.formatThaiDate(new Date()); // เช่น "วันศุกร์"
    this.bradenForm = this.fb.group({
      sensory: [null],
      moisture: [null],
      activity: [null],
      mobility: [null],
      nutrition: [null],
      friction: [null],
    });
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
  getCurrentTime(): string {
    const now = new Date();

    const pad = (num: number) => num.toString().padStart(2, '0');

    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    return `${hours} : ${minutes} : ${seconds}`;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // ----------------------------------------------------------------------------------------------------- 
  private async presentLoading() {
    this.isShowloading = true;
    const loading = await this.loadingCtrl.create({
      message: 'กำลังโหลด...',
      duration: Math.floor(Math.random() * (60000 - 1000 + 1)) + 1000, // ms (optional)
      spinner: 'circles' // 'bubbles', 'dots', 'lines', etc.
    });

    await loading.present();

    // Optional: wait for it to dismiss
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  private async presentAlertChecked() {
    const alert = await this.alertController.create({
      header: 'แจ้งเตือน!',
      subHeader: 'ตรวจสอบข้อมูล',
      cssClass: 'alert-1-hdr',
      message: 'กรุณากรอกข้อมูลในแบบฟอร์มให้ครบถ้วน',
      buttons: ['ตกลง']
    });

    await alert.present();
  }
  private async presentAlertCalc(value: string, css: string) {
    const alert = await this.alertController.create({
      header: 'แบบประเมินความเสี่ยง',
      subHeader: `ของการเกิดแผลกดทับ`,
      cssClass: css,
      message: `คะแนน: ${this.totalScore}, ${value}`,
      buttons: ['ตกลง']
    });

    await alert.present();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // ----------------------------------------------------------------------------------------------------- s
  getValueForm(form: string | undefined) {
    if (form) return this.bradenForm.get(form)?.value;
    return null;
  }
  calculateScore() {
    this.totalScore = this.bradenSectionsItems.reduce((sum, section) => sum + (section.score || 0), 0);

    const data = this.bradenForm?.value;
    // ตรวจสอบว่ามีค่า null หรือไม่
    const hasNull = Object.values(data).some(value => value === null);
    if (hasNull) {
      this.isShowRequire = true;
      this.presentAlertChecked();
      return;
    }

    const sum = Object.values(data)
      .filter(value => value !== null)
      .reduce((total: any, val: any) => total + val, 0);

    if (typeof sum === 'number' || sum === null) this.totalScore = sum;

    if (this.totalScore || this.totalScore === 0) {
      if (this.totalScore <= 9) {
        // this.presentAlertCalc('มีความเสี่ยงมากที่สุด', 'alert-2-hdr-high');
        this.riskLevel = 'มีความเสี่ยงมากที่สุด';
        this.riskColor = '#D32F2F';
      } else if (this.totalScore <= 12) {
        // this.presentAlertCalc('มีความเสี่ยงมาก', 'alert-2-hdr-moderate');
        this.riskLevel = 'ความเสี่ยงมาก';
        this.riskColor = '#FBC02D';
      } else if (this.totalScore <= 14) {
        // this.presentAlertCalc('มีความเสี่ยงมาก', 'alert-2-hdr-moderate');
        this.riskLevel = 'ความเสี่ยงปานกลาง';
        this.riskColor = '#388E3C';
      } else {
        this.riskLevel = 'ความเสี่ยงน้อย';
        this.riskColor = '#757575';
      }

      this.isModalResultOpen = true;
      //  else if (this.totalScore <= 18) {
      //   this.isModalResultOpen = true;
      //   this.riskLevel = 'ความเสี่ยงน้อย';
      // } else {
      //   this.presentAlertCalc('ความเสี่ยงต่ำ', 'alert-2-hdr-risk');
      //   this.riskLevel = 'ความเสี่ยงต่ำ';
      // }
    }
  }
  sectionClicked(form: string, value: number) {
    console.log(':: sectionClicked ::', form, value)
    // if (Math.random() < 0.25 && !this.isShowloading) this.presentLoading();
    this.bradenForm.get(form)?.setValue(value);
  }
  async viewInfo(title: string, info: string) {
    const alert = await this.alertController.create({
      header: 'คำอธิบาย',
      subHeader: title,
      cssClass: 'alert-1-hdr',
      message: `${info}`,
      buttons: ['ตกลง']
    });

    await alert.present();
  }
  close() {
    if (this.isModalResultOpen) this.isModalResultOpen = false;
    this._modalCtrl.dismiss(null, 'close');
  }
  async canDismiss(data?: undefined, role?: string) {
    return role === 'close';
  }
} 