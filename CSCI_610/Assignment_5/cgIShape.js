class cgIShape {
    constructor () {
        this.points = [];
        this.bary = [];
        this.indices = [];
    }
    
    addTriangle (x0,y0,z0,x1,y1,z1,x2,y2,z2,flip = true) {
        if (flip){
            var temp_x, temp_y, temp_z;
            temp_x = x1;
            temp_y = y1;
            temp_z = z1;
            x1 = x2;
            y1 = y2;
            z1 = z2;
            x2 = temp_x;
            y2 = temp_y;
            z2 = temp_z;
        }
        
        var nverts = this.points.length / 4;
        
        // push first vertex
        this.points.push(x0);  this.bary.push (1.0);
        this.points.push(y0);  this.bary.push (0.0);
        this.points.push(z0);  this.bary.push (0.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++;
        
        // push second vertex
        this.points.push(x1); this.bary.push (0.0);
        this.points.push(y1); this.bary.push (1.0);
        this.points.push(z1); this.bary.push (0.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++
        
        // push third vertex
        this.points.push(x2); this.bary.push (0.0);
        this.points.push(y2); this.bary.push (0.0);
        this.points.push(z2); this.bary.push (1.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++;
    }
}

class Cube extends cgIShape {
    
    constructor (subdivisions) {
        super();
        this.makeCube (subdivisions);
    }
    
    makeCube (subdivisions)  {
        
        // fill in your cube code here.
        var length = 3;
        var i, j, x, y, z;
        var step = length / subdivisions;
        var y_length = 0.25;
        var y_step = y_length / subdivisions;
        var temp_y, temp_z;
        
        // FEHG
        z = 0.5 * length;
        x = -0.5 * length;
        for (i = 0; i < subdivisions; i++){
            y = y_length/2;
            for (j = 0; j < subdivisions; j++){
                this.addTriangle(x, y, z, x, y-y_step, z-step, x, y-y_step, z, false);
                this.addTriangle(x, y, z, x, y, z-step, x, y-y_step, z-step, false);
                y -= y_step;
            }
            z -= step;
        }
        // EDAH
        y = -1 * y_length / 2;
        z = 0.5 * length;
        for (i = 0; i < subdivisions; i++){
            x = -0.5 * length;
            for (j = 0; j < subdivisions; j++){
                this.addTriangle(x, y, z, x+step, y, z-step, x+step, y, z, false);
                this.addTriangle(x, y, z, x, y, z-step, x+step, y, z-step, false);
                x += step;
            }
            z -= step;
        }
        // DCBA
        z = 0.5 * length;
        x = 0.5 * length;
        for (i = 0; i < subdivisions; i++){
            y = -1 * y_length / 2;
            for (j = 0; j < subdivisions; j++){
                this.addTriangle(x, y, z, x, y+y_step, z-step, x, y+y_step, z, false);
                this.addTriangle(x, y, z, x, y, z-step, x, y+y_step, z-step, false);
                y += y_step;
            }
            z -= step;
        }
        // CFGB
        z = 0.5 * length;
        y = y_length / 2;
        for (i = 0; i < subdivisions; i++){
            x = 0.5 * length;
            for (j = 0; j < subdivisions; j++){
                this.addTriangle(x, y, z, x-step, y, z-step, x-step, y, z, false);
                this.addTriangle(x, y, z, x, y, z-step, x-step, y, z-step, false);
                x -= step;
            }
            z -= step;
        }
        // GHAB
        z = -0.5 * length;
        x = -0.5 * length;
        for (i = 0; i < subdivisions; i++){
            y = y_length / 2;
            for (j = 0; j < subdivisions; j++){
                this.addTriangle(x, y, z, x+step, y-y_step, z, x, y-y_step, z, false);
                this.addTriangle(x, y, z, x+step, y, z, x+step, y-y_step, z, false);
                y -= y_step;
            }
            x += step;
        }
        // CDEF
        z = 0.5 * length;
        x = 0.5 * length;
        for (i = 0; i < subdivisions; i++){
            y = y_length / 2;
            for (j = 0; j < subdivisions; j++){
                this.addTriangle(x, y, z, x-step, y-y_step, z, x, y-y_step, z, false);
                this.addTriangle(x, y, z, x-step, y, z, x-step, y-y_step, z, false);
                y -= y_step;
            }
            x -= step;
        }
    
    }
}


class Cylinder extends cgIShape {

    constructor (radialdivision,heightdivision) {
        super();
        this.makeCylinder (radialdivision,heightdivision);
    }
    
    makeCylinder (radialdivision,heightdivision){
        // fill in your cylinder code here
        var length = 4;
        var cen_x = 0, cen_y = length * 0.5, cen_z = 0, cen_y_bottom = -1 * length * 0.5;
        var r = 1;
        var step = 360 / radialdivision;
        var i, j;
        for (i=0; i < radialdivision; i++){
            // Add top circle
            // this.addTriangle(cen_x, cen_y, cen_z, r * Math.cos(radians(step * i)), cen_y, r * Math.sin(radians(step * i)), r * Math.cos(radians(step * (i+1))), cen_y, r * Math.sin(radians(step * (i+1))));
            this.addTriangle(cen_x, cen_y, cen_z, r * Math.cos(radians(step * (i+1))), cen_y, r * Math.sin(radians(step * (i+1))), r * Math.cos(radians(step * i)), cen_y, r * Math.sin(radians(step * i)));
            
            // Add sides
            var y_top = 0.5 * length;
            var y_cur;
            var step_height = length / heightdivision;
            for (j = 0; j < heightdivision; j++){
                y_cur = y_top - step_height;
                this.addTriangle(r * Math.cos(radians(step * (i+1))), y_cur, r * Math.sin(radians(step * (i+1))), r * Math.cos(radians(step * (i+1))), y_top, r * Math.sin(radians(step * (i+1))), r * Math.cos(radians(step * i)), y_cur, r * Math.sin(radians(step * i)));
                this.addTriangle(r * Math.cos(radians(step * i)), y_top, r * Math.sin(radians(step * i)), r * Math.cos(radians(step * i)), y_cur, r * Math.sin(radians(step * i)), r * Math.cos(radians(step * (i+1))), y_top, r * Math.sin(radians(step * (i+1))));    
                // this.addTriangle(r * Math.cos(radians(step * (i+1))), y_cur, r * Math.sin(radians(step * (i+1))), r * Math.cos(radians(step * i)), y_cur, r * Math.sin(radians(step * i)), r * Math.cos(radians(step * (i+1))), y_top, r * Math.sin(radians(step * (i+1))));
                // this.addTriangle(r * Math.cos(radians(step * i)), y_top, r * Math.sin(radians(step * i)), r * Math.cos(radians(step * (i+1))), y_top, r * Math.sin(radians(step * (i+1))), r * Math.cos(radians(step * i)), y_cur, r * Math.sin(radians(step * i)));    
                y_top = y_cur;
            }
            
            // Add bottom circle
            this.addTriangle(cen_x, cen_y_bottom, cen_z, r * Math.cos(radians(step * (i+1))), cen_y_bottom, r * Math.sin(radians(step * (i+1))), r * Math.cos(radians(step * i)), cen_y_bottom, r * Math.sin(radians(step * i)));
        }
    }
}

class Cone extends cgIShape {

    constructor (radialdivision, heightdivision) {
        super();
        this.makeCone (radialdivision, heightdivision);
    }
    
    
    makeCone (radialdivision, heightdivision) {
    
        // Fill in your cone code here.

        var cen_x = 0, cen_y = 1, cen_z = 0, cen_y_bottom = -1;
        var r = 1;
        var step = 360 / radialdivision;
        var i, j;
        for (i=0; i < radialdivision; i++){
            // Add top circle
            
            // Add sides
            var y_top = 1;
            var y_cur;
            var step_height = 2 / heightdivision;
            for (j = 0; j < heightdivision; j++){
                y_cur = y_top - step_height;
                this.addTriangle(r * Math.cos(radians(step * (i+1))) * (j + 1) / heightdivision, y_cur, r * Math.sin(radians(step * (i+1))) * (j + 1) / heightdivision, r * Math.cos(radians(step * (i+1))) * j / heightdivision, y_top, r * Math.sin(radians(step * (i+1))) * j / heightdivision, r * Math.cos(radians(step * i)) * (j + 1) / heightdivision, y_cur, r * Math.sin(radians(step * i)) * (j + 1) / heightdivision);
                this.addTriangle(r * Math.cos(radians(step * i)) * j / heightdivision, y_top, r * Math.sin(radians(step * i)) * j / heightdivision, r * Math.cos(radians(step * i)) * (j + 1) / heightdivision, y_cur, r * Math.sin(radians(step * i)) * (j + 1) / heightdivision, r * Math.cos(radians(step * (i+1))) * j / heightdivision, y_top, r * Math.sin(radians(step * (i+1))) * j / heightdivision);    
                // this.addTriangle(r * Math.cos(radians(step * (i+1))) * (j + 1) / heightdivision, y_cur, r * Math.sin(radians(step * (i+1))) * (j + 1) / heightdivision, r * Math.cos(radians(step * i)) * (j + 1) / heightdivision, y_cur, r * Math.sin(radians(step * i)) * (j + 1) / heightdivision, r * Math.cos(radians(step * (i+1))) * j / heightdivision, y_top, r * Math.sin(radians(step * (i+1))) * j / heightdivision);
                // this.addTriangle(r * Math.cos(radians(step * i)) * j / heightdivision, y_top, r * Math.sin(radians(step * i)) * j / heightdivision, r * Math.cos(radians(step * i)) * (j + 1) / heightdivision, y_cur, r * Math.sin(radians(step * i)) * (j + 1) / heightdivision, r * Math.cos(radians(step * (i+1))) * j / heightdivision, y_top, r * Math.sin(radians(step * (i+1))) * j / heightdivision);    
                y_top = y_cur;
            }
            
            // Add bottom circle
            this.addTriangle(cen_x, cen_y_bottom, cen_z, r * Math.cos(radians(step * (i+1))), cen_y_bottom, r * Math.sin(radians(step * (i+1))), r * Math.cos(radians(step * i)), cen_y_bottom, r * Math.sin(radians(step * i)));
            // this.addTriangle(cen_x, cen_y_bottom, cen_z, r * Math.cos(radians(step * i)), cen_y_bottom, r * Math.sin(radians(step * i)), r * Math.cos(radians(step * (i+1))), cen_y_bottom, r * Math.sin(radians(step * (i+1))));
        }

    }
}
    
class Sphere extends cgIShape {

    constructor (slices, stacks) {
        super();
        this.makeSphere (slices, stacks);
    }
    
    makeSphere (slices, stacks) {
        // fill in your sphere code here

        var i, j;
    
        var step_slice = 360 / slices;
        var step_stack = 360 / stacks;
        var top_y = 1;
        var cur_y;
        var cur_stack_degree = 0;
        var new_stack_degree;
        var x0, y0, z0, x1, y1, z1, x2, y2, z2, x3, y3, z3;
        var new_r, upper_r, lower_r;
        for (i = 0; i < stacks; i++){
            new_stack_degree = cur_stack_degree + step_stack;
            y0 = 1 * Math.cos(radians(step_stack * i));
            y1 = y0;
            y2 = 1 * Math.cos(radians(step_stack * (i+1)));
            y3 = y2;
            upper_r = 1 * Math.sin(radians(step_stack * i));
            lower_r = 1 * Math.sin(radians(step_stack * (i+1)));
            for (j = 0; j < slices; j++){
                x0 = upper_r * Math.cos(radians(step_slice * j));
                z0 = upper_r * Math.sin(radians(step_slice * j));
                x1 = upper_r * Math.cos(radians(step_slice * (j+1)));
                z1 = upper_r * Math.sin(radians(step_slice * (j+1)));
    
                x3 = lower_r * Math.cos(radians(step_slice * j));
                z3 = lower_r * Math.sin(radians(step_slice * j));
                x2 = lower_r * Math.cos(radians(step_slice * (j+1)));
                z2 = lower_r * Math.sin(radians(step_slice * (j+1)));
    
                this.addTriangle(x0, y0, z0, x3, y3, z3, x1, y1, z1);
                this.addTriangle(x1, y1, z1, x3, y3, z3, x2, y2, z2);
            }
        }

    }

}


function radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

