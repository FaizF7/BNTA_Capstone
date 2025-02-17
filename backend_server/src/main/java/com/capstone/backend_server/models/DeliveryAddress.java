package com.capstone.backend_server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "delivery_addresses")
public class DeliveryAddress extends Address {

    @ManyToOne
    @JoinColumn(name = "warehouse_id")
//    @JsonIgnoreProperties({"deliveryAddresses", "drivers", "longitude", "latitude", "address", "routes"})
    @JsonIgnore
    private Warehouse warehouse;

    @Column
    private boolean isWarehouse;


//    @OneToMany(mappedBy = "location")
//    @JsonIgnore
//    private List<Checkpoint> checkpoints;

    public DeliveryAddress(double longitude, double latitude, String address, Warehouse warehouse) {
        super(longitude, latitude, address);
        this.warehouse = warehouse;
//        this.checkpoints = new ArrayList<>();
        this.isWarehouse = false;
    }


    public DeliveryAddress() {
    }

//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }

    public Warehouse getWarehouse() {
        return warehouse;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }

    public boolean getIsWarehouse() {
        return isWarehouse;
    }

    public void setIsWarehouse(boolean warehouse) {
        isWarehouse = warehouse;
    }
}
