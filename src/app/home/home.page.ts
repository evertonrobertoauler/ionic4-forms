import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(private router: Router, private loading: LoadingController) {}

  async submit() {
    const loading = await this.loading.create({ content: 'Signing in...' });
    await loading.present();
    await this.router.navigateByUrl('/tabs/(about:about)');
    await loading.dismiss();
  }
}
