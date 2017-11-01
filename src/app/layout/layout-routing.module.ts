import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'landing', loadChildren: './landing/landing.module#LandingModule' },
            { path: 'feeds', loadChildren: './feeds/feeds.module#FeedsModule'},
            { path: 'readlater', loadChildren: './read-later/read-later.module#ReadLaterModule'},
            { path: 'articleview', loadChildren: './feeds/articleview/articleview.module#ArticleviewModule' },
            { path: 'magazineview', loadChildren: './feeds/magazineview/magazineview.module#MagazineviewModule' } 
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
