import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { NoLoginGuard } from "./guards/no-login.guard";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    loadChildren: "./componentes/login/login.module#LoginPageModule",
    canActivate: [NoLoginGuard]
  },
  {
    path: "registro",
    loadChildren: "./componentes/registro/registro.module#RegistroPageModule",
    canActivate: [NoLoginGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
