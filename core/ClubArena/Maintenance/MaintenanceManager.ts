import GameEnvironment from "../GameEnvironment";

export default class MaintenanceManager {

    public handleMaintenance(playerSocketID: string, access, noaccess) {

        // Si le jeu n'est pas en maintenance
        // OU le jeu est en maintenance mais le joueur est assez ranké
        if(GameEnvironment.getSettings().getMaintenance() == false || (GameEnvironment.getSettings().getMaintenance() == true && GameEnvironment.getPlayerManager().getPlayer(playerSocketID).getPermission().hasAccessInMaintenance())) {

            access()

            // Si le jeu est en maintenance et le joueur n'est pas assez ranké
        } else if(GameEnvironment.getSettings().getMaintenance() == true && GameEnvironment.getPlayerManager().getPlayer(playerSocketID).getPermission().hasAccessInMaintenance() == false) {

            noaccess()

        }

    }

}