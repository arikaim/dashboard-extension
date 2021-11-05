<?php
/**
 * Arikaim
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
 * 
*/
namespace Arikaim\Extensions\Dashboard\Models;

use Illuminate\Database\Eloquent\Model;

use Arikaim\Core\Db\Traits\Uuid;
use Arikaim\Core\Db\Traits\Find;
use Arikaim\Core\Db\Traits\Status;

/**
 * Dashboard model class
 */
class Dashboard extends Model  
{
    use Uuid,    
        Status,            
        Find;
    
    /**
     * Table name
     *
     * @var string
     */
    protected $table = 'dashboard';

    /**
     * Fillable attributes
     *
     * @var array
     */
    protected $fillable = [
        'component_name',
        'options',
        'status'           
    ];
    
    /**
     * Disable timestamps
     *
     * @var boolean
     */
    public $timestamps = false;

    /**
     * Hide dashboard panel 
     *
     * @param string $componentName
     * @return boolean
     */
    public function hidePanel(string $componentName): bool
    {
        $model = $this->where('component_name','=',$componentName)->first();
        if (\is_object($model) == false) {
            $model = $this->create([
                'component_name' => $componentName
            ]);
        }

        return $model->setStatus(0);
    }

    /**
     * Show dashboard panel 
     *
     * @param string $componentName
     * @return boolean
     */
    public function showPanel(string $componentName): bool
    {
        $model = $this->where('component_name','=',$componentName)->first();
        if (\is_object($model) == false) {
            $model = $this->create([
                'component_name' => $componentName
            ]);
        }

        return $model->setStatus(1);
    }

    /**
     * Return true if panel is hidden
     *
     * @param string $componentName
     * @return boolean
     */
    public function isHidden(string $componentName): bool
    {
        if (empty($componentName) == true) {
            return false;
        }
        $model = $this->where('component_name','=',$componentName)->first();
        
        return (\is_object($model) == false) ? false : ($model->status != 1);
    }

     /**
     * Return true if panel is visible
     *
     * @param string $componentName
     * @return boolean
     */
    public function isVisible(string $componentName): bool
    {
        if (empty($componentName) == true) {
            return false;
        }
        $model = $this->where('component_name','=',$componentName)->first();
        
        return (\is_object($model) == false) ? true : ($model->status == 1);
    }
}
