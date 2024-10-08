import { Component, computed, OnInit, signal, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
//import { SidenavServiceService } from 'src/app/Servicios/sidenav-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MenuItem } from '../Models/MenuItem';
import { SoporteCallComponent } from '../Modulos/soporte-call/soporte-call.component';
import { SidenavServiceService } from '../Servicios/sidenav-service.service';
import { TokenService } from '../Servicios/token.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private observer: BreakpointObserver, private sidenavService: SidenavServiceService, public dialog: MatDialog, private tokenService: TokenService) { }



  openDialog(): void {

    this.dialog.open(SoporteCallComponent, {
      width: '800px', // Ajusta el tamaño del modal
    });

  }

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = false;
  isCollapsed = true;
  logo!: string;
  textUsuario!: string;
  icoUsuario!: string;
  isLogged = false;
  toggleIcon() {
    if (!this.isMobile) {
      this.icoUsuario = this.icoUsuario === 'arrow_right' ? 'arrow_drop_down' : 'arrow_right';
    }
  }

  onMenuOpened() {
    if (!this.isMobile) {
      this.icoUsuario = 'arrow_drop_down';
    }
  }

  onMenuClosed() {
    if (!this.isMobile) {
      this.icoUsuario = 'arrow_right';
    }
  }

  closeSidenav() {
    if (this.isMobile) {
      this.sidenav.close();
    }
  }
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      // On desktop/tablet, the menu can never be fully closed
      this.collapsed.set(!this.collapsed());


    }
  }
  collapsed = signal(false);

  sidenavWidth = computed(() => {
    if (this.isMobile) {
      return this.collapsed() ? '0px' : '70%';
    } else {
      return this.collapsed() ? '65px' : '250px';
    }
  });

  sidenamarginleft = computed(() => {
    if (this.isMobile) {
      return '0%';
    } else {
      return this.collapsed() ? '65px' : '250px';
    }
  });

  computeSidenavWidth() {
    return () => {
      if (this.isMobile)
        return '100%';
      else
        return computed(() => this.collapsed() ? '65px' : '250px')();

    };
  }
  clearPanelName(item: any) {
    if (item.label === 'Cerrar sessión') {
      this.tokenService.logOut();
    } else {
      this.sidenavService.clearPanelName();
    }
    //   
  }

  ngOnInit() {
    const token = this.tokenService.getToken();
    if (token != "") {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      if (Date.now() >= tokenPayload.exp * 1000) {
        // Token ha expirado
        // this.router.navigate(['/session-expired']);
        this.tokenService.logOut();
        this.isLogged = true;

      }
    }
    this.sidenavService.closeSidenav$.subscribe(() => {
      if (this.isMobile)
        this.sidenav.close();
    });

    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });

    if (this.isMobile) {
      this.logo = "/assets/CabeceraDiris.jpg";
      this.textUsuario = "";
      this.icoUsuario = "settings";

    } else {
      this.logo = "/assets/CabeceraDiris.jpg";
      this.textUsuario = this.tokenService.getUserName();
      this.icoUsuario = "arrow_right";
    }
  }


  menuItems = signal<MenuItem[]>([

    {
      icon: 'person',
      label: 'Perfil',
      route: '/perfil',
    },
    {
      icon: 'logout',
      label: 'Cerrar sessión',
      route: '/login',
    }
  ]);
}
