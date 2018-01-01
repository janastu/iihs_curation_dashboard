import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'feeds/:id', loadChildren: './feeds/feeds.module#FeedsModule'},
            { path: 'readlater', loadChildren: './read-later/read-later.module#ReadLaterModule'},
            { path: 'recentlyread', loadChildren: './recently-read/recently-read.module#RecentlyReadModule'},
            { path: 'boardfeeds/:id', loadChildren: './boardfeeds/boardfeeds.module#BoardfeedsModule',data: [{isProd: true}]},
            { path: 'sources', loadChildren: './sources/sources.module#SourcesModule'},
            { path: 'management', loadChildren: './views/management/management.module#ManagementModule'},
            { path: 'profile', loadChildren: './views/profile/profile.module#ProfileModule'},
            { path: 'preferences', loadChildren: './views/preferences/preferences.module#PreferencesModule'},
            { path: 'trashbox', loadChildren: './trash-box/trash-box.module#TrashBoxModule'}
            //{ path: 'articleview', loadChildren: './feeds/articleview/articleview.module#ArticleviewModule' },
            //{ path: 'magazineview', loadChildren: './feeds/magazineview/magazineview.module#MagazineviewModule' },
            //{ path: 'title-view', loadChildren: './feeds/title-view/title-view.module#TitleViewModule' }, 
            //{ path: 'card-view', loadChildren: './feeds/card-view/card-view.module#CardViewModule' } 


        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
