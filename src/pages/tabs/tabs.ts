import { Component } from '@angular/core';

import { MovePage } from '../move/move';
import { ClientPage } from '../clients/clients';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MovePage;
  tab3Root = ClientPage;

  constructor() {

  }
}
