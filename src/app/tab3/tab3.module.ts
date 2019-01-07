import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UVIndexPage } from './tab3.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: UVIndexPage }])
  ],
  declarations: [UVIndexPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class UVIndexPageModule {}
