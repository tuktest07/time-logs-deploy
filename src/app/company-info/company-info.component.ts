import { isPlatformBrowser, NgIf } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { IonCard, IonCardContent, IonContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss'],
  standalone: true,
  imports: [IonCardHeader, 
    IonContent,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    NgIf
  ]
})
export class CompanyInfoComponent implements OnInit {
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() { }

}
