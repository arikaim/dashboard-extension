/**
 *  Arikaim
 *  @copyright  Copyright (c) Konstantin Atanasov <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
'use strict';

function DashboardControlPanel() {
   
    this.hidePanel = function(name, onSuccess, onError) {
        var data = {
            component_name: name
        }

        return arikaim.put('/api/admin/dashboard/hide',data,onSuccess,onError);          
    };

    this.showPanel = function(name, onSuccess, onError) { 
        var data = { 
            component_name: name
        };
        
        return arikaim.put('/api/admin/dashboard/show',data,onSuccess,onError);           
    };   

    this.init = function() {
        arikaim.ui.button('.dasboard-settings',function(element) {

            $('#dashboard_settings_content').fadeIn(500);
            arikaim.page.loadContent({
                id: 'dashboard_settings_content',
                component: 'dashboard::admin.settings'           
            }); 
        });
    }
}

var dashboardControlPanel = new DashboardControlPanel();

arikaim.component.onLoaded(function() {
    dashboardControlPanel.init();
});