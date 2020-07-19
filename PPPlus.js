class PPPlus {
    /**
     * 
     * @param {Object} data 
     * @param {Number} data.AimTotal
     * @param {Number} data.AimJump
     * @param {Number} data.AimFlow
     * @param {Number} data.Precision
     * @param {Number} data.Speed
     * @param {Number} data.Stamina
     * @param {Number} data.Accuracy
     * @param {Number} data.Performance
     */
    constructor(data) {
        this.AimTotal = data.AimTotal;
        this.AimJump = data.AimJump;
        this.AimFlow = data.AimFlow;
        this.Precision = data.Precision;
        this.Speed = data.Speed;
        this.Stamina = data.Stamina;
        this.Accuracy = data.Accuracy;
        this.Performance = data.Performance;
    }

    F1(x) {
        return Math.pow(x, 1.0 / x - 1.0);
    }

    Integral(f, min, max) {
        const N = 100000;
        let result = 0;
        let delta = (max - min) / N;
        for (let i = 0; i < N; i++) {
            result += f(min + (i + 0.5) * delta) * delta;
        }
        return result;
    }

    GetNewCost() {
        let acc = Math.max(this.Accuracy, 500);
        let cost1 = (Math.sqrt(this.AimJump / 3000.0) + Math.sqrt(this.AimFlow / 1500.0)) * (Math.sqrt(this.AimJump / 3000.0) + Math.sqrt(this.AimFlow / 1500.0)) / 4.0;
        cost1 = cost1 * (1.0 + this.Precision / 5000.0) / 1.2;
        let cost2 = Math.pow((acc - 500.0) / 2000.0, 0.6) * 0.8;
        let cost3 = Math.pow(this.Integral(this.F1, 1.0, 1.0 + this.Speed / 1000.0) / 2.0, 0.8) * Math.pow(this.Integral(this.F1, 1.0, 1.0 + this.Stamina / 1000.0) / 2.0, 0.5);
        let cost = cost1 + cost2 + cost3;
        return cost;
    }

    OutputNewCost() {
        const newcost = this.GetNewCost().toFixed(4);
        let output = "";
        output = output + "Jump:" + this.AimJump + "\n";
        output = output + "Flow:" + this.AimFlow + "\n";
        output = output + "Precision:" + this.Precision + "\n";
        output = output + "Acc:" + this.Accuracy + "\n";
        output = output + "Speed:" + this.Speed + "\n";
        output = output + "Stamina:" + this.Stamina + "\n";
        output = output + "\n";
        output = output + "newCost:" + newcost + "\n";
        return output;
    }
}

module.exports = PPPlus;