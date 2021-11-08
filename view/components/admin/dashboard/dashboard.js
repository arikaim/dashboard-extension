/**
 *  Arikaim
 *  @copyright  Copyright (c) Konstantin Atanasov <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
'use strict';

function DashboardControlPanel() {
    var self = this;

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

    this.initSettings = function() {
        arikaim.ui.button('.view-panel-button',function(element) {
            var visible = $(element).attr('data-visible');
            var icon = $(element).children('.icon');
            var componentName = $(element).attr('component-name');

            if (visible == true) {
                $(element).attr('data-visible',0);
                self.hidePanel(componentName,function(result) {
                    $(icon).addClass('slash');
                    self.loadDashboard();
                });
            } else {
                $(element).attr('data-visible',1);
                self.showPanel(componentName,function(result) {
                    $(icon).removeClass('slash');
                    self.loadDashboard();
                });
            }
        });
    };

    this.loadDashboard = function() {
        return arikaim.page.loadContent({
            id: 'dashboard_content',
            component: 'dashboard::admin.dashboard.items'           
        }); 
    };

    this.init = function() {       
        arikaim.ui.button('.dasboard-settings',function(element) {
            var state = $(element).attr('state');
            if (state == 'on') {
                $('#dashboard_settings_content').fadeOut(500);     
                $(element).attr('state','off');
                $(element).addClass('primary').removeClass('green');
            } else {
                $('#dashboard_settings_content').fadeIn(500);               
                arikaim.page.loadContent({
                    id: 'dashboard_settings_content',
                    component: 'dashboard::admin.settings'           
                }); 
                $(element).attr('state','on');
                $(element).addClass('green').removeClass('primary');
            }           
        });
    }
}

var dashboardControlPanel = new DashboardControlPanel();

arikaim.component.onLoaded(function() {
    dashboardControlPanel.init();
});