import { AfterViewInit, Component, computed, Input, OnInit, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
//import { SidenavServiceService } from 'src/app/Servicios/sidenav-service.service';
import { MatAccordion } from '@angular/material/expansion';
import { RouterLinkActive } from '@angular/router';
import { MenuItem } from '../../Models/MenuItem';
import { TokenService } from '../../Servicios/token.service';
import { SidenavServiceService } from '../../Servicios/sidenav-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent implements OnInit {

  constructor(private tokenService: TokenService, private sidenavService: SidenavServiceService, private router: Router) { }

  establecimiento = this.tokenService.getEstablecimiento();
  Nombre = this.tokenService.getNombre();
  avatarcito = this.tokenService.getAvatar().ruta;


  isPanelExpanded!: boolean;
  nombrepanel!: string;
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  // constructor(private sidenavService: SidenavServiceService) {}

  ngOnInit() {
    
    this.router.navigate([this.menuItems()[0].route]);
    this.sidenavService.panelName$.subscribe(name => {
      this.nombrepanel = name;
    });


  }

  onMenuItemClick2() {
    this.sidenavService.closeSidenav();
    this.nombrepanel = "";
  }

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }
  menuItems = signal<MenuItem[]>([

    /* {
       icon: 'dashboard',
       label: 'dashboard',
       route: '/dashboard',
     },*/
    {
      icon: 'pregnant_woman',
      label: 'Anemia',
      route: '/anemia',
    },
    {
      icon: 'boy',
      label: 'Recién Nacido',
      route: '/rn',
    },
   
    /*,
    {
      icon: 'person',
      label: 'Niño 01 año',
      route: '/nino01',
    }*/
  ]);

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100')

  panels = [
    {
      title: 'Accesos',
      icon: 'closed_caption',
      menuItems: [
        {
          icon: 'group',
          label: 'Listado',
          route: '/usuarios',
        }
      ]
    },
   /* {
      title: 'Recién Nacido',
      icon: 'dataset',
      menuItems: [
        {
          icon: 'settings',
          label: 'Indicador',
          route: '/rn',
        },
      ]
    },*/
  ];

  get accessiblePanels() {
    return this.panels.filter(panel => {
      if (panel.title === 'Accesos') {
        return this.tokenService.getAuthorities().length > 1;
      }
      return true; // Mostrar otros paneles
    });
  }

  onMenuItemClick(nombre: string) {
    this.nombrepanel = nombre;
  }

  ico20!: string;
  cambio(nombre: string): boolean {
    this.ico20 = this.nombrepanel;
    return this.nombrepanel === nombre;

  }
}
