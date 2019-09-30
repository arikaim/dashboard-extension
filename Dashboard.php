<?php
/**
 * Arikaim
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) 2016-2018 Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/
namespace Arikaim\Extensions\Dashboard;

use Arikaim\Core\Packages\Extension\Extension;

/**
 * Dashboard class
 */
class Dashboard extends Extension
{
    /**
     * Install extension
     *
     * @return void
     */
    public function install()
    {
        // Events
        $this->registerEvent('dashboard.get.items','Trigger on show dashboard page');
     
        return true;
    }   
}
