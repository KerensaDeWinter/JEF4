import Phaser from 'phaser'

export default class MonkeyContainer extends Phaser.GameObjects.Container
{
	public display: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
	private circle1: Phaser.GameObjects.Arc;
	private circle2: Phaser.GameObjects.Arc;

	// NOTE: change this to test scenario with physics body as child of Scene
	private containPhysicsObject1 = true
	private containPhysicsObject2 = true

	get physicsBody1()
	{
		return this.circle1.body as Phaser.Physics.Arcade.Body
	}
	get physicsBody2()
	{
		return this.circle2.body as Phaser.Physics.Arcade.Body
	}

	get physicsDisplay1()
	{
		return this.circle1
	}

	get physicsDisplay2()
	{
		return this.circle2
	}

	get isPhysicsDisplayContained1()
	{
		return this.containPhysicsObject1
	}

	get isPhysicsDisplayContained2()
	{
		return this.containPhysicsObject2
	}


	constructor(scene: Phaser.Scene, x: number, y: number)
	{
		super(scene, x, y)

		scene.load.spritesheet('test', '/assets/dude.png', { frameWidth: 32, frameHeight: 48 })

		this.display = scene.physics.add.sprite(0, 0, 'test');

		this.add(this.display)
		// this.display.setOrigin(0.5,0);
        this.display.setScale(2);

		const width = this.display.width
		const height = this.display.height
		console.log(width)

		const radius = 20

		this.circle1 = scene.add.circle(
			-150, (height/7),
			radius,
			undefined,
			0
		)
		this.circle2 = scene.add.circle(
			150, (height/7),
			radius,
			undefined,
			0
		)

		scene.physics.add.existing(this.circle1);
		scene.physics.add.existing(this.circle2);


		if (!this.containPhysicsObject1)
		{
			this.circle1.x += x
			this.circle1.y += y
		}
		else
		{
			this.add(this.circle1)
		}

		if (!this.containPhysicsObject2)
		{
			this.circle2.x += x
			this.circle2.y += y
		}
		else
		{
			this.add(this.circle2)
		}

		this.display.x += width * 0.35

		this.physicsBody1.setCircle(20)
		this.physicsBody2.setCircle(20)


		scene.add.existing(this)
	}
}
