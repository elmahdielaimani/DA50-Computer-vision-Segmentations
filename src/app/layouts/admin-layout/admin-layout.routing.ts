import { Routes } from '@angular/router';
import { AuthGuard } from '../../auth.guard'; // Importez la guard

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { ImagesComponent } from 'app/pages/images/images.component';
import { UsersListComponent } from 'app/pages/users-list/users-list.component';
import { ViewImageComponent } from 'app/pages/view-image/view-image.component';
import { PromotionComponent } from 'app/promotion/promotion.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'table', component: TableComponent, canActivate: [AuthGuard] },
  { path: 'images', component: ImagesComponent, canActivate: [AuthGuard] },
  { path: 'image/:id', component: ViewImageComponent, canActivate: [AuthGuard]},
  { path: 'typography', component: TypographyComponent, canActivate: [AuthGuard] },
  { path: 'icons', component: IconsComponent, canActivate: [AuthGuard] },
  { path: 'maps', component: MapsComponent, canActivate: [AuthGuard] },
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
  { path: 'upgrade', component: UpgradeComponent, canActivate: [AuthGuard] },
  { path: 'user-list', component: UsersListComponent, canActivate: [AuthGuard] },
  { path: 'upgrade', component: UpgradeComponent, canActivate: [AuthGuard] },
  { path: 'promotion/:email', component: PromotionComponent, canActivate: [AuthGuard] },
];
