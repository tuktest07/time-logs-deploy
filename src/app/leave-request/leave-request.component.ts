import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonItem, IonLabel, IonList, IonText, IonFabButton, IonIcon, IonInput, IonRadioGroup, IonTextarea, IonSelect, IonSelectOption, IonDatetimeButton, IonDatetime, IonModal, IonToolbar, IonTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss'],
  standalone: true,
  imports: [IonToolbar,
    IonTextarea,
    IonRadioGroup,
    IonInput,
    IonIcon,
    IonFabButton,
    IonHeader,
    IonFooter,
    IonContent,
    IonButton,
    IonCard,
    IonText,
    IonCardContent,
    NgIf,
    NgFor,
    IonList,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonDatetimeButton,
    IonDatetime,
    IonModal,
    IonToolbar,
    IonTitle
  ]
})
export class LeaveRequestComponent implements OnInit {
  isBrowser: boolean;
  leaveType: any[] = [
    "ลาป่วย",
    "ลาพักร้อน / ลาประจำปี",
    "ลาเหตุผลส่วนตัว",
    "ลาคลอดบุตร",
    "ลาพ่อเพื่อดูแลลูก",
    "ลาไปงานศพ / ลาเพื่อไว้อาลัย",
    "ลาโดยไม่รับค่าจ้าง",
    "ลาเหตุฉุกเฉิน",
    "ลาจากการแต่งงาน",
    "ลาเพื่อการศึกษา",
    "ลาไปปฏิบัติหน้าที่ทหาร"
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() { }

}
