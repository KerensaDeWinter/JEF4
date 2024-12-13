import Phaser from 'phaser'

export default class MonkeyContainer extends Phaser.GameObjects.Container
{
	public display: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
	private circle1: Phaser.GameObjects.Arc;
	private circle2: Phaser.GameObjects.Arc;
	private ellipse: Phaser.GameObjects.Ellipse;

	// NOTE: change this to test scenario with physics body as child of Scene
	private containPhysicsObject1 = true
	private containPhysicsObject2 = true
	private containPhysicsObject3 = true

	get physicsBody1()
	{
		return this.circle1.body as Phaser.Physics.Arcade.Body
	}
	get physicsBody2()
	{
		return this.circle2.body as Phaser.Physics.Arcade.Body
	}
	get physicsBody3()
	{
		return this.ellipse.body as Phaser.Physics.Arcade.Body
	}
	get physicsDisplay1()
	{
		return this.circle1
	}

	get physicsDisplay2()
	{
		return this.circle2
	}
	get physicsDisplay3()
	{
		return this.ellipse
	}
	get isPhysicsDisplayContained1()
	{
		return this.containPhysicsObject1
	}

	get isPhysicsDisplayContained2()
	{
		return this.containPhysicsObject2
	}
	get isPhysicsDisplayContained3()
	{
		return this.containPhysicsObject3
	}

	constructor(scene: Phaser.Scene, x: number, y: number)
	{
		super(scene, x, y)

		scene.load.spritesheet('monkey', '/monkey-sprite.png', { frameWidth: 880, frameHeight: 1264 })

		this.display = scene.physics.add.sprite(-300, -77, 'monkey'); // hier positie aap aanpassen

		this.add(this.display);
		this.display.setOrigin(0.5,0);
        this.display.setScale(0.6); // hier scale aanpassen

		const width = this.display.width
		const height = this.display.height
		console.log(width)

		const radius = 20

		this.circle1 = scene.add.circle(
			-220, (height/3.15),
			radius,
			undefined,
			0
		)
		this.circle2 = scene.add.circle(
			220, (height/3.15),
			radius,
			undefined,
			0
		)
		this.ellipse = scene.add.ellipse(
			0, height/3.5,
			width/4,
			height/2,
			undefined,
			0
		)

		scene.physics.add.existing(this.circle1);
		scene.physics.add.existing(this.circle2);
		scene.physics.add.existing(this.ellipse);


		// if (!this.containPhysicsObject1)
		// {
		// 	this.circle1.x += x
		// 	this.circle1.y += y
		// }
		// else
		// {
			this.add(this.circle1)
		// }

		// if (!this.containPhysicsObject2)
		// {
		// 	this.circle2.x += x
		// 	this.circle2.y += y
		// }
		// else
		// {
			this.add(this.circle2)
			this.add(this.ellipse)

		// }

		this.display.x += width * 0.35

		this.physicsBody1.setCircle(20)
		this.physicsBody2.setCircle(20)
		// this.physicsBody3.setGameObject(this.ellipse);


		scene.add.existing(this)
	}
}
