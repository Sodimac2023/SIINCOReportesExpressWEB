import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/ui/app.layout.service';
/**
 * Componente de footer
 * @author fespana
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(public layoutService: LayoutService) {}
  ngOnInit(): void {}
}
