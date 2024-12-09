import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="page-footer blue darken-3">
      <div class="container">
        <div class="row">
          <div class="col s12 m6 l6">
            <h5 class="white-text">Game Mania</h5>
            <p class="grey-text text-lighten-4">Seu lugar para todas as suas necessidades.</p>
          </div>
          <div class="col s12 m6 l4 offset-l2">
            <h5 class="white-text">Links</h5>
            <ul class="footer-links">
              <li><a class="grey-text text-lighten-3" href="#!">Sobre</a></li>
              <li><a class="grey-text text-lighten-3" href="#!">Contato</a></li>
              <li><a class="grey-text text-lighten-3" href="#!">Termos</a></li>
              <li><a class="grey-text text-lighten-3" href="#!">Privacidade</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-copyright">
        <div class="container center-align">
          2024 Game Mania
        </div>
      </div>
    </footer>
  `,
  styles: [`
    @media (max-width: 600px) {
      .footer-links {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      
      .footer-links li {
        flex-basis: 50%;
        margin-bottom: 10px;
        text-align: center;
      }
      
      .page-footer .container {
        width: 90%;
      }
      
      .page-footer h5 {
        text-align: center;
      }
      
      .page-footer p {
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {}