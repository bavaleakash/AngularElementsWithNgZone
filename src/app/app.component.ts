import { Component, Injector, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { MessengerComponent } from './messenger/messenger.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  content = null;
  contentButton = null;

  constructor(public domSanitizer: DomSanitizer, public injector: Injector, private ngZone: NgZone) {

    const messengerElement = createCustomElement(MessengerComponent, { injector });
    customElements.define('my-messenger', messengerElement);

    Window['app'] = { zone: this.ngZone, onClick: () => this.onButtonClick() };

    setTimeout(() => {
      // this.content = this.domSanitizer.bypassSecurityTr?ustHtml('<my-messenger message="This is a dynamic component"></my-messenger>');
      this.content = this.domSanitizer.bypassSecurityTrustHtml(
        `<button onclick="Window['app'].zone.run(() => { Window['app'].onClick() })">
          Click me!
        </button>`
      );
    }, 1000);
  }

  onButtonClick() {
    alert('I am pressed!');
  }

}
