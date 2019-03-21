import GameObject from "../object/GameObject";
import Tile from "../tile/Tile";

export default class Node extends GameObject {
    constructor(config={}) {
        super(config)

        this.data.position = config.position
        this.data.map = config.map
        this.data.tile = new Tile({...config.tile, node: this})
        this.data.player = config.player
        this.data.item = config.item

        this.state.position = this.data.position
        this.state.map = this.data.map
        this.state.tile = this.data.tile
        this.state.player = this.data.player
        this.state.item = this.data.item
    }

    /// Position Getter/Setter ///

    /**
     * 
     */
    getPosition() {
        return this.data.position
    }

    /**
     * 
     */
    getX() {
        return this.data.position.getX()
    }

    /**
     * 
     */
    getY() {
        return this.data.position.getY()
    }

    /// Map Getter/Setter ///

    /**
     * 
     */
    getMap() {
        return this.data.map
    }

    /// Tile Getter/Setter ///

    /**
     * 
     */
    getTile() {
        return this.data.tile
    }

    /**
     * 
     * @param {*} tile 
     * @param {*} queue 
     */
    setTile(tile, queue) {
        this.getTile().removeNode(queue)
        this.setData({tile: tile})

        tile.setNode(this, queue)

        this.setState({tile: tile}, queue)
    }

    /// Player Getter/Setter ///

    /**
     * 
     */
    hasPlayer() {
        return this.data.player !== undefined
    }

    /**
     * 
     */
    getPlayer() {
        return this.data.player
    }

    /**
     * 
     * @param {*} player 
     * @param {*} queue 
     */
    setPlayer(player, queue) {
        if (this.hasPlayer()) {
            this.removePlayer(queue)
        }
        this.setData({player: player})
        player.setNode(this, queue)

        this.setState({player: player}, queue)
    }

    /**
     * 
     * @param {*} queue 
     */
    removePlayer(queue) {
        if (this.hasPlayer()) {
            this.getPlayer().removeNode()
            this.setData({player: undefined})
            this.setState({player: undefined}, queue)
        }
    }

    /// Structure Getter/Setter ///

    /**
     * 
     */
    hasStructure() {
        return this.data.structure !== undefined
    }

    /**
     * 
     */
    getStructure() {
        return this.data.structure
    }

    /**
     * 
     * @param {*} structure 
     * @param {*} queue 
     */
    setStructure(structure, queue) {
        if (this.hasStructure()) {
            this.removeStructure(queue)
        }
        this.setData({structure: structure})
        structure.setNode(this, queue)

        this.setState({structure: structure}, queue)
    }

    /**
     * 
     * @param {*} queue 
     */
    removeStructure(queue) {
        if (this.hasStructure()) {
            this.getStructure().removeNode(queue)
            this.setData({structure: undefined})
            this.setState({structure: undefined}, queue)
        }
    }

    /// Item Getter/Setter ///

    /**
     * 
     */
    hasItem() {
        return this.item !== undefined
    }

    /**
     * 
     */
    getItem() {
        return this.item
    }

    /**
     * 
     * @param {*} item 
     * @param {*} queue 
     */
    setItem(item, queue) {
        if (this.hasItem()) {
            this.removeItem(queue)
        }
        this.setData({item: item})
        item.setNode(this, queue)

        this.setState({item: item}, queue)
    }

    /**
     * 
     * @param {*} queue 
     */
    removeItem(queue) {
        if (this.hasItem()) {
            this.getItem().removeNode(queue)
            this.setData({item: undefined})
            this.setState({item: undefined}, queue)
        }
    }
}