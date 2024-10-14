import { AfterViewInit, Component, computed, Input, OnInit, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
//import { SidenavServiceService } from 'src/app/Servicios/sidenav-service.service';
import { MatAccordion } from '@angular/material/expansion';
import { RouterLinkActive } from '@angular/router';
import { MenuItem } from '../../Models/MenuItem';
import { TokenService } from '../../Servicios/token.service';
import { SidenavServiceService } from '../../Servicios/sidenav-service.service';
import { Router } from '@angular/router';
import { CatalogosService } from '../../Servicios/catalogos.service';
import { TablerosService } from '../../Servicios/tableros.service';
import { Tableros } from '../../Models/Tableros';
import { AnemiaComponent } from '../../Tableros/Tableros.component';


@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent implements OnInit,AfterViewInit  {

  menuItems = signal<MenuItem[]>([]);



  constructor(private serviceTablero: TablerosService,private tokenService: TokenService, private sidenavService: SidenavServiceService, private router: Router, private catalogoServicie: CatalogosService) { }
  ngAfterViewInit(): void {

  }

  establecimiento = this.tokenService.getEstablecimiento();
  Nombre = this.tokenService.getNombre();
  avatarcito = this.tokenService.getAvatar().ruta;


  isPanelExpanded!: boolean;
  nombrepanel!: string;
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  // constructor(private sidenavService: SidenavServiceService) {}

  ngOnInit() {
    this.loadMenuItems();
    this.serviceTablero.setTablero("Anemia");

    this.router.navigate(["/Tableros/Anemia"]);
    this.sidenavService.panelName$.subscribe(name => {
      this.nombrepanel = name;
    });


  }

  onMenuItemClick2(nombre:string) {
    this.sidenavService.closeSidenav();
    this.nombrepanel = "";
    this.serviceTablero.setTablero(nombre);
  }

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }
  //menuItems = signal<MenuItem[]>([

  /* {
     icon: 'dashboard',
     label: 'dashboard',
     route: '/dashboard',
   },*/
  /* {
     icon: 'pregnant_woman',
     label: 'Anemia',
     route: '/anemia',
   },
   {
     icon: 'boy',
     label: 'Recién Nacido',
     route: '/rn',
   },
  */
  /*,
  {
    icon: 'person',
    label: 'Niño 01 año',
    route: '/nino01',
  }*/
  //]);

  loadMenuItems(): void {
    this.catalogoServicie.Tableros().subscribe(
      (data) => {
        // Mapea los datos de la respuesta a MenuItem
        
        const mappedItems: MenuItem[] = data.map((item) => ({
          icon: "pregnant_woman",
          label: item.nombretablero,
          route: "/Tableros",
        }));

        this.menuItems.set(mappedItems); // Asigna los datos a la señal
      },
      (error) => {
        console.error('Error al cargar los items del menú:', error);
      }
    );
  }

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100')

  panels = [
    {
      title: 'Acciones',
      icon: 'closed_caption',
      menuItems: [
        {
          icon: 'group',
          label: 'Usuarios',
          route: '/usuarios',
        },
        {
          icon: 'group',
          label: 'Tableros',
          route: '/tablerosCrud',
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
      if (panel.title === 'Acciones') {
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
