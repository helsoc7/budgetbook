import { Controller, Get } from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
    constructor(private readonly metricsService: MetricsService) { }

    @Get()
    getMetrics(): string {
        return this.metricsService.getMetrics();
    }

    //simulate increment usercounters
    // @Get('simulate')
    // simulateAction(): string {
    //     this.metricsService.incrementNewUserCounter();
    //     this.metricsService.incrementExistingUserCounter();
    //     return 'Simulated action and incremented counters';
    // }

}